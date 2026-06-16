import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_utils = _load("utils/strings.py")


class TestStringRotation:
    def setup_method(self):
        _utils.reassign_is_substring()
        _m = _load("09_string_rotation.py")
        self.string_rotation = _m.string_rotation

    def test_rotates_a_string(self):
        """rotates a string"""
        assert self.string_rotation("Hello", "oHell") == True

    def test_rotates_another_string(self):
        """rotates another string"""
        assert self.string_rotation("waterbottle", "erbottlewat") == True
