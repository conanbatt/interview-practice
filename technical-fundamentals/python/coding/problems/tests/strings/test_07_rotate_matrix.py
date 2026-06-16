import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("07_rotate_matrix.py")
rotate_matrix = _m.rotate_matrix


class TestRotateMatrix:
    def test_rotates_2x2_matrix_clockwise(self):
        """rotates 2x2 matrix clockwise"""
        matrix = [[1, 2], [3, 4]]
        rotate_matrix(matrix)
        assert matrix == [[3, 1], [4, 2]]

    def test_rotates_3x3_matrix_clockwise(self):
        """rotates 3x3 matrix clockwise"""
        matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        rotate_matrix(matrix)
        assert matrix == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

    def test_rotates_4x4_matrix_clockwise(self):
        """rotates 4x4 matrix clockwise"""
        matrix = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        rotate_matrix(matrix)
        assert matrix == [
            [13, 9, 5, 1],
            [14, 10, 6, 2],
            [15, 11, 7, 3],
            [16, 12, 8, 4],
        ]

    def test_rotates_5x5_matrix_clockwise(self):
        """rotates 5x5 matrix clockwise"""
        matrix = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]
        rotate_matrix(matrix)
        assert matrix == [
            [21, 16, 11, 6, 1],
            [22, 17, 12, 7, 2],
            [23, 18, 13, 8, 3],
            [24, 19, 14, 9, 4],
            [25, 20, 15, 10, 5],
        ]
