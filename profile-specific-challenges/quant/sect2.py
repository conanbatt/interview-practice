import requests
from typing import List
import pandas as pd
from datetime import datetime, timedelta
from pprint import pprint
import sect1
import sqlite3



API_KEY_ID = "PK9XVS034Z9PM7RXYDXW"
API_SECRET_KEY = "AJaufgyQ710KEGDCu3dHjwvfHlwwX0Kf2MaoIDLa"


def getQuotes(tickers: List):
    url = "https://data.alpaca.markets/v2/stocks/trades/latest"

    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": API_KEY_ID,
        "APCA-API-SECRET-KEY": API_SECRET_KEY,
    }

    params = {
        "symbols": ",".join(tickers),  
        "feed" : "iex"        
    }
    session = requests.Session()
    response = session.get(url, params=params, headers=headers)

    try:
        data = response.json().get("trades")
        return {

                item[0]: item[1].get("p")
                for item in data.items()
        }
    except:
        return {
            ticker: None
            for ticker in tickers
        }
    


def getChain(ticker: str, S:float) -> pd.DataFrame:
    url = f"https://data.alpaca.markets/v1beta1/options/snapshots/{ticker}"

    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": API_KEY_ID,
        "APCA-API-SECRET-KEY": API_SECRET_KEY,
    }

    params = {
        "feed" : "indicative",
        "limit": 1000,
        
        # moneyness
        "strike_price_gte": S * 0.75,
        "strike_price_lte": S * 1.25,

        # TTM
        "expiration_date_gte": (datetime.now() + timedelta(days=30)).isoformat()[:10],
        "expiration_date_lte": (datetime.now() + timedelta(days=180)).isoformat()[:10]


    }
    session = requests.Session()
    response = session.get(url, params=params, headers=headers)

    try:
        data = response.json().get("snapshots")
        c = [
                {"contract": item[0],
                "bid": item[1].get("latestQuote").get("bp"),
                "ask": item[1].get("latestQuote").get("ap"),
                }
            for item in data.items()
        ]
        df = pd.DataFrame(c)
        df["stock"] = df["contract"].str.extract(r"(^[A-Z]+)")
        df["opex"] = df["contract"].str.extract(r"(\d{6})").apply(lambda x: pd.to_datetime(x, format="%y%m%d"))
        df["ctype"] = df["contract"].str.extract(r"\d{6}([CP])")
        df["strike"] = df["contract"].str.extract(r"(\d{8}$)").astype(float).divide(10**3)

        df["mark"] = (df["bid"]+df["ask"])/2
        df["slippage"] = (df["ask"]-df["bid"]) / (df["bid"]+df["ask"])
        df["TTM"] = (df["opex"] - datetime.now()).dt.days / 365

        FREE_RISK = 0.04
        df["iv_bid"] = df.apply(lambda row: sect1.iv(S, row["strike"], row["TTM"], FREE_RISK, row["bid"], row["ctype"]).get("iv"), axis=1 )
        df["iv_ask"] = df.apply(lambda row: sect1.iv(S, row["strike"], row["TTM"], FREE_RISK, row["ask"], row["ctype"]).get("iv"), axis=1 )
        df["iv"] = df.apply(lambda row: sect1.iv(S, row["strike"], row["TTM"], FREE_RISK, row["mark"], row["ctype"]).get("iv"), axis=1 )
        df["exercise_probability"] = df.apply(lambda row: sect1.bs(S, row["strike"], row["TTM"], FREE_RISK, row["iv"], row["ctype"]).get("exercise_probability"), axis=1 )

        return df
    
    except:
        return pd.DataFrame()
        
conn = sqlite3.connect("options_ddbb.ddbb")
conn.execute("DROP TABLE IF EXISTS options;")

tickers = ["AAPL", "AMZN", "NVDA", "KO", "JPM"]
spots = getQuotes(tickers)

for ticker in tickers:
    chain = getChain(ticker, spots[ticker])
    chain.to_sql("options", con=conn, if_exists="append", index=False)
    read = pd.read_sql(f"SELECT * FROM options WHERE stock='{ticker}' ORDER BY exercise_probability DESC LIMIT 5;", con=conn)
    print(read)

conn.execute("CREATE INDEX IF NOT EXISTS idx_stock ON options(stock);")
conn.execute("CREATE INDEX IF NOT EXISTS idx_iv_bid ON options(iv_bid);")
conn.execute("CREATE INDEX IF NOT EXISTS idx_iv_ask ON options(iv_ask);")
conn.execute("CREATE INDEX IF NOT EXISTS idx_iv ON options(iv);")