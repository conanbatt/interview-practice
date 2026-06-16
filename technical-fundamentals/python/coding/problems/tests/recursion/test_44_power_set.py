import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("44_power_set.py")
power_set = _m.power_set


def _sorted_sets(sets):
    return sorted([sorted(s) for s in sets])


class TestPowerSet:
    def test_returns_correct_power_set_for_3_elements(self):
        """returns correct power set for a given set"""
        expected = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
        assert _sorted_sets(power_set([1, 2, 3])) == _sorted_sets(expected)

    def test_returns_correct_power_set_for_empty_set(self):
        """returns correct power set for 4"""
        assert _sorted_sets(power_set([])) == [[]]

    def test_returns_correct_power_set_for_4_elements(self):
        expected = [
            [], [1], [2], [3], [4],
            [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
            [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4],
            [1, 2, 3, 4],
        ]
        assert _sorted_sets(power_set([1, 2, 3, 4])) == _sorted_sets(expected)
