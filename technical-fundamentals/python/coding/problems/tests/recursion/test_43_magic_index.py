import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("43_magic_index.py")
find_magic_index_distinct = _m.find_magic_index_distinct
find_magic_index_non_distinct = _m.find_magic_index_non_distinct


class TestMagicIndexDistinct:
    def test_returns_correct_magic_index(self):
        """returns correct magic index for distinct input"""
        assert find_magic_index_distinct([-2, -1, 0, 2, 4, 6, 8]) == 4
        assert not find_magic_index_distinct([-3, -2, -1, 4, 5, 7, 9])


class TestMagicIndexNonDistinct:
    def test_returns_correct_magic_index(self):
        """returns correct magic index for non-distinct input"""
        assert find_magic_index_non_distinct([-10, -5, 2, 2, 2, 2, 4, 7, 9, 12, 13]) == 2
        assert not find_magic_index_non_distinct([-10, -5, 0, 2, 5, 7, 9, 12, 13])
