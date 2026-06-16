import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("05_one_away.py")
is_one_away = _m.is_one_away


class TestOneAway:
    def test_one_away_replace(self):
        """One Away - Replace"""
        assert is_one_away("pale", "bale") == True
        assert is_one_away("bbaa", "bcca") == False

    def test_one_away_replace2(self):
        """One Away - Replace"""
        assert is_one_away("pale", "bale") == True

    def test_one_away_insert(self):
        """One Away - Insert"""
        assert is_one_away("pale", "ple") == True

    def test_one_away_remove(self):
        """One Away - Remove"""
        assert is_one_away("pale", "pales") == True

    def test_same_strings(self):
        """Same Strings"""
        assert is_one_away("abc", "abc") == True

    def test_more_than_one_edit_away(self):
        """More Than One Edit Away"""
        assert is_one_away("abcd", "efgh") == False

    def test_more_than_one_edit_away_2(self):
        """More Than One Edit Away #2"""
        assert is_one_away("palesa", "pale") == False

    def test_empty_strings(self):
        """Empty Strings"""
        assert is_one_away("", "") == True

    def test_one_character_difference(self):
        """One Character Difference"""
        assert is_one_away("a", "ab") == True

    def test_empty_and_non_empty_string(self):
        """Empty and Non-Empty String"""
        assert is_one_away("", "a") == True
