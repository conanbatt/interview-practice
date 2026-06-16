import importlib.util
from pathlib import Path
import pytest

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("37_build_order.py")
build_order = _m.build_order


class TestBuildOrder:
    def test_returns_correct_build_order(self):
        """returns correct build order for valid input"""
        projects = ["a", "b", "c", "d", "e", "f"]
        deps = [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]]
        assert build_order(projects, deps) == ["e", "f", "a", "b", "d", "c"]

    def test_raises_error_for_no_valid_order(self):
        """throws error for no valid order"""
        projects = ["a", "b", "c", "d", "e"]
        deps = [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]]
        with pytest.raises(Exception, match="No valid build order exists"):
            build_order(projects, deps)

    def test_single_project(self):
        """returns correct build order for single project"""
        assert build_order(["a"], []) == ["a"]

    def test_empty_input(self):
        """returns correct build order for empty input"""
        assert build_order([], []) == []
