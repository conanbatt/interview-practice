import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("47_permutations_with_dups.py")
permutations_without_dups = _m.permutations_without_dups
permutations_with_dups = _m.permutations_with_dups


class TestPermutationsWithoutDups:
    def test_returns_correct_permutations(self):
        """returns correct permutations for a string of unique characters"""
        result = permutations_without_dups("abc")
        expected = ["abc", "acb", "bac", "bca", "cab", "cba"]
        assert all(p in result for p in expected)


class TestPermutationsWithDups:
    def test_returns_correct_permutations_with_dups(self):
        """returns correct permutations for a string with duplicate characters"""
        result = permutations_with_dups("aab")
        expected = ["aab", "aba", "baa"]
        assert all(p in result for p in expected)

    def test_returns_correct_permutations_4_chars(self):
        result = permutations_with_dups("aabb")
        expected = ["aabb", "abab", "abba", "baab", "baba", "bbaa"]
        assert all(p in result for p in expected)
