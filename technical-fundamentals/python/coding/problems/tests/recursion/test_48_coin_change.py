import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("48_coin_change.py")
coin_change = _m.coin_change


class TestCoinChange:
    def test_returns_0_if_coins_do_not_match(self):
        """returns 0 if coins are invalid or do not match"""
        assert coin_change(10, [15]) == 0
        assert coin_change(10, []) == 0
        assert coin_change(10, [7]) == 0

    def test_returns_correct_counts(self):
        """returns correct counts for various examples"""
        assert coin_change(5, [1, 2, 5]) == 4
        assert coin_change(10, [10]) == 1
