import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sqlite3
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import json, math

def fitP(X, y, degree=2):
    X_poly = PolynomialFeatures(include_bias=False, degree=degree).fit_transform(X)
    return {
        "X_poly": X_poly,
        "model": LinearRegression().fit(X_poly, y)
    }

# iterate tickers/opexs -> fit model -> persist
# predict k_range / iv_pred(strikes)
# new ddbb table
# dataviz
# queries

conn = sqlite3.connect("options_ddbb.ddbb")
conn.execute("DROP TABLE IF EXISTS modeling;")
data = pd.read_sql("SELECT * FROM options WHERE iv_bid > 0.1;", con=conn)

tickers = data.stock.unique().tolist()
for ticker in tickers:
    opexs = data.loc[data.stock==ticker].opex.unique().tolist()
    COLS = 3
    ROWS = math.ceil(len(opexs)/COLS)
    fig, ax = plt.subplots(figsize=(15,5*ROWS), dpi=300, nrows=ROWS, ncols=COLS)

    for i, opex in enumerate(opexs):
        chain = data.loc[(data.stock==ticker)&(data.opex==opex)].copy()
        X , y = chain[["strike"]], chain["iv"].values
        res = fitP(X, y)
        X_poly, model = res["X_poly"], res["model"]
        with open(f"models/{ticker}_{opex[:10]}", "w") as file:
            json.dump({
                        "intercept": model.intercept_,
                        "coefficients": model.coef_.tolist(),
            }, file)

        K_range = pd.DataFrame(np.linspace(X.min(), X.max(), 100))
        smile = model.intercept_ + model.coef_[0] * K_range + model.coef_[1] * K_range**2

        chain["iv_pred"] = model.predict(X_poly)
        chain.to_sql("modeling", con=conn, if_exists="append", index=False)

        row, col = i//COLS, i%COLS
        ax[row][col].plot(K_range, smile, ls='--', color='gray', lw=1, label='Model')
        ax[row][col].scatter(chain["strike"], chain["iv_bid"], marker='x', lw=1, s=20, color='green', label='Bids')
        ax[row][col].scatter(chain["strike"], chain["iv_ask"], marker='x', lw=1, s=20, color='red', label='Asks')
        ax[row][col].legend(frameon=False, ncols=3, loc='upper center', bbox_to_anchor=(0.5, 1.2))
        ax[row][col].grid(alpha=0.3)
        ax[row][col].set_xlabel("Strikes")
        ax[row][col].set_ylabel("Volatility")
        ax[row][col].set_title(f"Model IV {ticker}, OPEX: {opex}", y=1.2)
        ax[row][col].spines["top"].set_visible(False)
        ax[row][col].spines["right"].set_visible(False)

    plt.subplots_adjust(hspace=0.5, wspace=0.4)
    plt.savefig(f"charts/{ticker}.png")

#sell
query = "SELECT * FROM modeling WHERE exercise_probability > 0.15 ORDER BY (iv_bid - iv_pred) DESC LIMIT 5; "
print(pd.read_sql(query, con=conn))

#buy
query = "SELECT * FROM modeling WHERE exercise_probability > 0.15 ORDER BY (iv_pred - iv_ask) DESC LIMIT 5; "
print(pd.read_sql(query, con=conn))