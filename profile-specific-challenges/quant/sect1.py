from typing import TypedDict

class BS(TypedDict):
    price: float
    exercise_probability: float
    gamma: float


class IV(TypedDict):
    iv: float
    iterations: int



def bs(S: float, K: float, T:float, r:float, sigma:float, ctype: str) -> BS:
    pass

def iv(S: float, K: float, T:float,  r:float, market_price:float, ctype: str, tol=0.001) -> IV:
    pass