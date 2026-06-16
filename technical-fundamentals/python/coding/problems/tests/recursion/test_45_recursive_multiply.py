import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("45_recursive_multiply.py")
recursive_multiply = _m.recursive_multiply


class TestRecursiveMultiply:
    def test_returns_correct_product(self):
        """returns correct product for two positive integers"""
        assert recursive_multiply(3, 4) == 12
        assert recursive_multiply(5, 7) == 35
        assert recursive_multiply(9, 2) == 18
        assert recursive_multiply(0, 10) == 0
        assert recursive_multiply(8, 0) == 0
