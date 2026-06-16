import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("06_string_compression.py")
string_compression = _m.string_compression


class TestStringCompression:
    def test_compresses_string_with_repeated_characters(self):
        """compresses string with repeated characters"""
        assert string_compression("aabcccccaaa") == "a2b1c5a3"

    def test_returns_original_string_if_compression_does_not_reduce_length(self):
        """returns original string if compression does not reduce length"""
        assert string_compression("abcde") == "abcde"

    def test_returns_empty_string_for_empty_input(self):
        """returns empty string for empty input"""
        assert string_compression("") == ""

    def test_returns_single_character_for_single_character_string(self):
        """returns single character for string with single character"""
        assert string_compression("a") == "a"

    def test_compresses_uppercase_and_lowercase(self):
        """compresses string with uppercase and lowercase letters"""
        assert string_compression("AAAbbbCCCddd") == "A3b3C3d3"

    def test_returns_original_string_if_no_repeated_characters(self):
        """returns original string if no repeated characters"""
        assert string_compression("abcdef") == "abcdef"
