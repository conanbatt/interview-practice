import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("03_urlify.py")
urlify = _m.urlify


class TestURLify:
    def test_replaces_spaces_with_percent_20(self):
        """Replaces spaces in a string with '%20'"""
        assert urlify("ab c") == "ab%20c"

    def test_handles_leading_and_trailing_spaces(self):
        """Handles leading and trailing spaces"""
        assert urlify("  ab c  ") == "%20%20ab%20c%20%20"

    def test_returns_empty_string_when_input_is_empty(self):
        """Returns empty string when input is empty"""
        assert urlify("") == ""

    def test_does_not_modify_string_without_spaces(self):
        """Doesn't modify string without spaces"""
        assert urlify("abc") == "abc"

    def test_handles_multiple_consecutive_spaces(self):
        """Handles multiple consecutive spaces"""
        assert urlify("a  b   c") == "a%20%20b%20%20%20c"

    def test_handles_special_characters(self):
        """Handles special characters"""
        assert urlify("a b!c") == "a%20b!c"

    def test_mr_john_smith(self):
        """Mr 3ohn Smith"""
        assert urlify("Mr 3ohn Smith") == "Mr%203ohn%20Smith"
