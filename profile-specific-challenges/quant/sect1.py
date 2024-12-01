from typing import TypedDict

class BS(TypedDict):
    price: float
    exercise_probability: float
    gamma: float


class IV(TypedDict):
    iv: float
    iterations: int

import math
from scipy.stats import norm

Phi = norm.cdf
phi = norm.pdf

def bs(S: float, K: float, T:float, r:float, sigma:float, ctype: str) -> BS:
    dp = (math.log(S/K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    dm = (math.log(S/K) + (r - 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    gamma = phi(dp) / (S * sigma * math.sqrt(T))

    if ctype == 'C':
        px = S * Phi(dp) - K * math.e**(-r*T) * Phi(dm)
        exP = Phi(dm)
    else:
        px = -S * Phi(-dp) + K * math.e**(-r*T) * Phi(-dm)
        exP = Phi(-dm)

    return {
        'price': float(px),
        'exercise_probability': float(exP),
        'gamma': float(gamma),
    }



def iv(S: float, K: float, T:float,  r:float, market_price:float, ctype: str, tol=0.0001) -> IV:
    l, h = 0.01, 2
    i = 0
    while h-l > tol:
        mid = (l+h)/2
        px = bs(S, K , T, r, mid, ctype).get('price')
        if px > market_price:
            h = mid
        else:
            l = mid
        i += 1
    return {
        'iv': float(mid),
        'iterations': int(i),
    }


def vega(S: float, K: float, T:float, r:float, sigma:float) -> float:
    dp = (math.log(S/K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    vega = phi(dp)  * S * math.sqrt(T)
    return vega

def ivNR(S: float, K: float, T:float,  r:float, market_price:float, ctype: str, tol=0.0001) -> IV:
    sigma = 0.5
    i = 0
    while True:
        px = bs(S, K , T, r, sigma, ctype).get('price')
        diff = px - market_price
        if abs(diff) < tol:
            break
        sigma = sigma - diff / vega(S, K ,T, r, sigma)
        i += 1
    return {
        'iv': float(sigma),
        'iterations': int(i),
    }

def ivSec(S: float, K: float, T:float,  r:float, market_price:float, ctype: str, tol=0.0001) -> IV:
    sigma1, sigma2 = 0.01, 2
    i = 0
    while True:
        px1 = bs(S, K , T, r, sigma1, ctype).get('price')
        px2 = bs(S, K , T, r, sigma2, ctype).get('price')
        diff1 = px1 - market_price
        diff2 = px2 - market_price
        if abs(diff2) < tol:
            break
        sigma_ok = sigma2 - diff2 * (sigma2 - sigma1) / (diff2 - diff1)
        sigma1, sigma2 = sigma2, sigma_ok
        i += 1
    return {
        'iv': float(sigma_ok),
        'iterations': int(i),
    }





