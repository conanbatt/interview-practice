import unittest
import math,time

from sect1 import bs, iv

class BlackScholesTests(unittest.TestCase):
    
    def setUp(self):
        self.S = 100  
        self.K = 100  
        self.T = 0.5   
        self.r = 0.04 
        self.sigma = 0.3 

    def test_bs_call(self):
        expected_call_price = 9.3904
        call_price = bs(S=self.S, K=self.K, T=self.T, r=self.r, sigma=self.sigma, ctype='C').get('price')
        self.assertAlmostEqual(call_price, expected_call_price, places=4, msg="Call price is wrong")

    def test_bs_put(self):
        expected_put_price = 7.4103
        put_price = bs(S=self.S, K=self.K, T=self.T, r=self.r, sigma=self.sigma, ctype='P').get('price')
        self.assertAlmostEqual(put_price, expected_put_price, places=4, msg="Put price is wrong")

    def test_exercise_probability(self):
        expected_prob = 0.4953  
        prob = bs(S=self.S, K=self.K, T=self.T, r=self.r, sigma=self.sigma, ctype='C').get('exercise_probability')
        self.assertAlmostEqual(prob, expected_prob, places=3, msg="Exercise probability is wrong")

    def test_gamma(self):
        expected_gamma = 0.0184 
        gamma_value = bs(S=self.S, K=self.K, T=self.T, r=self.r, sigma=self.sigma, ctype='C').get('gamma')
        self.assertAlmostEqual(gamma_value, expected_gamma, places=4, msg="Gamma value is wrong")

    def test_iv(self):
        market_price = 9.3904
        implied_vol = iv(S=self.S, K=self.K, T=self.T, r=self.r, market_price=market_price, ctype='C').get('iv')
        self.assertAlmostEqual(implied_vol, self.sigma, places=3, msg="Implied volatility is wrong")
    

    def test_implied_volatility_log_complexity_iterations(self):
        tolerances = [0.1, 0.05, 0.03, 0.01, 0.005, 0.002, 0.001]
        iterations = []
        expected_market_price = 9.3904

        for tol in tolerances:
            result = iv(S=self.S, K=self.K, T=self.T, r=self.r, market_price=expected_market_price, ctype='C', tol=tol)
            iter_count = result['iterations']
            iterations.append(iter_count)

        growth_factors = [iterations[i] / iterations[i-1] for i in range(1, len(iterations))]
        average_growth = sum(growth_factors) / len(growth_factors)
        self.assertLess(average_growth, 1.5, "Average complexity of IV calc is not O(log(n))")

