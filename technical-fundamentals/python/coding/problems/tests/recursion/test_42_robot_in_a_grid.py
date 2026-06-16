import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("42_robot_in_a_grid.py")
robot_in_a_grid = _m.robot_in_a_grid


class TestRobotInAGrid:
    def test_returns_correct_path_for_3x3_grid(self):
        """returns correct path for a 3x3 grid"""
        grid = [
            [True, True, False],
            [True, False, True],
            [True, True, True],
        ]
        assert robot_in_a_grid(grid) == [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]

    def test_returns_correct_path_for_4x4_grid(self):
        """returns correct path for a 4x4 grid"""
        grid = [
            [True, True, True, False],
            [True, False, True, True],
            [True, True, False, False],
            [False, True, True, True],
        ]
        assert robot_in_a_grid(grid) == [(0, 0), (0, 1), (0, 2), (1, 2), (1, 3), (2, 3), (3, 3)]

    def test_returns_false_for_no_path(self):
        """returns false for no path"""
        grid = [
            [True, False, True, False],
            [False, False, True, True],
            [True, True, True, False],
            [True, True, True, True],
        ]
        assert not robot_in_a_grid(grid)
