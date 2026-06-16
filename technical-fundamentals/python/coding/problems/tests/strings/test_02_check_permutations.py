import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("02_check_permutations.py")
check_permutations = _m.check_permutations


class TestCheckPermutations:
    def test_returns_true_for_permutations_with_same_length_strings(self):
        """Returns true for permutations with same length strings"""
        assert check_permutations("abc", "cba") == True

    def test_returns_false_for_strings_with_different_lengths(self):
        """Returns false for strings with different lengths"""
        assert check_permutations("abc", "cbad") == False

    def test_returns_true_for_permutations_with_special_characters(self):
        """Returns true for permutations with special characters"""
        assert check_permutations("abc!", "!bac") == True

    def test_returns_false_for_non_permutations_with_special_characters(self):
        """Returns false for non-permutations with special characters"""
        assert check_permutations("abc!", "!bcd") == False

    def test_returns_true_for_empty_strings(self):
        """Returns true for empty strings"""
        assert check_permutations("", "") == True

    def test_returns_true_for_long_strings_with_same_characters(self):
        """Returns true for long strings with same characters"""
        assert check_permutations("a" * 1000, "a" * 1000) == True

    def test_returns_false_for_long_strings_with_different_characters(self):
        """Returns false for long strings with different characters"""
        assert check_permutations("a" * 1000, "b" * 1000) == False
