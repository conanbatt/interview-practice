import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("41_triple_steps.py")
triple_step = _m.triple_step


class TestTripleStep:
    def test_returns_correct_count_for_valid_input(self):
        """returns correct count for valid input"""
        assert triple_step(0) == 0
        assert triple_step(1) == 1
        assert triple_step(2) == 2
        assert triple_step(3) == 4
        assert triple_step(4) == 7
        assert triple_step(5) == 13

    def test_returns_0_for_negative_input(self):
        """returns 0 for negative input"""
        assert triple_step(-1) == 0
        assert triple_step(-10) == 0
