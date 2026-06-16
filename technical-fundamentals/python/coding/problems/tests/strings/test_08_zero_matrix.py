import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("08_zero_matrix.py")
zero_matrix = _m.zero_matrix


class TestZeroMatrix:
    def test_zeroes_2x2_matrix(self):
        """zeroes 2x2 matrix"""
        matrix = [[0, 2], [3, 4]]
        zero_matrix(matrix)
        assert matrix == [[0, 0], [0, 4]]

    def test_zeroes_3x3_matrix(self):
        """zeroes 3x3 matrix"""
        matrix = [[1, 2, 3], [4, 5, 6], [7, 0, 9]]
        zero_matrix(matrix)
        assert matrix == [[1, 0, 3], [4, 0, 6], [0, 0, 0]]

    def test_zeroes_4x4_matrix(self):
        """zeroes 4x4 matrix"""
        matrix = [
            [1, 2, 3, 4],
            [5, 6, 0, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        zero_matrix(matrix)
        assert matrix == [
            [1, 2, 0, 4],
            [0, 0, 0, 0],
            [9, 10, 0, 12],
            [13, 14, 0, 16],
        ]

    def test_2_zeroes_4x4_matrix(self):
        """2 zeroes 4x4 matrix"""
        matrix = [
            [0, 2, 3, 4],
            [5, 6, 0, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        zero_matrix(matrix)
        assert matrix == [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 10, 0, 12],
            [0, 14, 0, 16],
        ]
