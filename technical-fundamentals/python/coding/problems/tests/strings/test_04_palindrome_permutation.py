import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("04_palindrome_permutation.py")
palindrome_permutation = _m.palindrome_permutation


class TestPalindromePermutation:
    def test_empty_string(self):
        """Empty string"""
        assert palindrome_permutation("") == True

    def test_single_character_string(self):
        """Single character string"""
        assert palindrome_permutation("a") == True

    def test_palindrome_with_odd_length(self):
        """Palindrome with odd length"""
        assert palindrome_permutation("taco cat") == True

    def test_palindrome_with_even_length(self):
        """Palindrome with even length"""
        assert palindrome_permutation("rdeder") == True

    def test_non_palindrome_with_odd_length(self):
        """Non-palindrome with odd length"""
        assert palindrome_permutation("hello") == False

    def test_non_palindrome_with_even_length(self):
        """Non-palindrome with even length"""
        assert palindrome_permutation("world") == False

    def test_string_with_mixed_case(self):
        """String with mixed case"""
        assert palindrome_permutation("RaceCar") == True

    def test_string_with_repeated_letters(self):
        """String with repeated letters"""
        assert palindrome_permutation("rrracecrrar") == True

    def test_string_with_non_alphanumeric_characters(self):
        """String with non-alphanumeric characters"""
        assert palindrome_permutation("12321") == True

    def test_string_with_no_possible_palindrome_permutation(self):
        """String with no possible palindrome permutation"""
        assert palindrome_permutation("abcdefg") == False
