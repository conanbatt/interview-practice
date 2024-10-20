import unittest
import math

class TestBlackScholesCall(unittest.TestCase):

    def setUp(self):
        # Set up common test cases, for example:
        self.tolerance = 1e-5  # Define tolerance level for float comparisons

    def test_zero_volatility(self):
        # When volatility is zero, the option price should be max(S - K * exp(-r * T), 0)
        S, K, T, r, sigma = 100, 100, 1, 0.05, 0
        expected_price = max(S - K * math.exp(-r * T), 0)
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

    def test_at_the_money(self):
        # At the money, with some standard parameters
        S, K, T, r, sigma = 100, 100, 1, 0.05, 0.2
        expected_price = 10.4506  # Pre-calculated from known sources or libraries
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

    def test_deep_in_the_money(self):
        # Deep in-the-money, the call option should be approximately S - K * exp(-r * T)
        S, K, T, r, sigma = 150, 100, 1, 0.05, 0.2
        expected_price = S - K * math.exp(-r * T)
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

    def test_deep_out_of_the_money(self):
        # Deep out-of-the-money, the call option should be approximately 0
        S, K, T, r, sigma = 50, 100, 1, 0.05, 0.2
        expected_price = 0
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

    def test_zero_interest_rate(self):
        # When interest rate is zero, use simplified formulas without discounting
        S, K, T, r, sigma = 100, 100, 1, 0, 0.2
        expected_price = 10.728  # Pre-calculated or known reference
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

    def test_short_time_to_maturity(self):
        # Short time to maturity, price approaches intrinsic value
        S, K, T, r, sigma = 100, 90, 0.01, 0.05, 0.2
        expected_price = 10.0  # Approximation close to intrinsic value
        calculated_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(calculated_price, expected_price, delta=self.tolerance)

if __name__ == '__main__':
    unittest.main()
