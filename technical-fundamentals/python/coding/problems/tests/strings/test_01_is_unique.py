import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("01_is_unique.py")
is_unique = _m.is_unique


class TestIsUnique:
    def test_returns_true_for_unique_characters(self):
        """Returns true for unique characters"""
        assert is_unique("abc") == True
        assert is_unique("abcdefg") == True
        assert is_unique("123456") == True
        assert is_unique("!@#$%^") == True

    def test_returns_false_for_non_unique_characters(self):
        """Returns false for non-unique characters"""
        assert is_unique("aab") == False
        assert is_unique("hello") == False
        assert is_unique("testing") == False
        assert is_unique("1234456") == False
        assert is_unique("abccdef") == False

    def test_returns_true_for_empty_string(self):
        """Returns true for empty string"""
        assert is_unique("") == True

    def test_handles_whitespace_correctly(self):
        """Handles whitespace correctly"""
        assert is_unique("a b c") == False
        assert is_unique("ab c") == True

    def test_handles_special_characters_correctly(self):
        """Handles special characters correctly"""
        assert is_unique("!@#$%^&*") == True
        assert is_unique("!@#$%^&*!") == False

    def test_handles_mixed_case_correctly(self):
        """Handles mixed case correctly"""
        assert is_unique("aA") == True
        assert is_unique("Aa") == True
        assert is_unique("Hello") == False
