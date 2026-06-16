import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("46_towers_of_hanoi.py")
towers_of_hanoi = _m.towers_of_hanoi


class TestTowersOfHanoi:
    def test_returns_correct_tower_configuration(self):
        """returns correct tower configuration after moving disks"""
        assert towers_of_hanoi(3) == ([], [], [3, 2, 1])
        assert towers_of_hanoi(4) == ([], [], [4, 3, 2, 1])
        assert towers_of_hanoi(5) == ([], [], [5, 4, 3, 2, 1])
