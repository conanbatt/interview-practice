import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("38_first_common_ancestor.py")
first_common_ancestor = _m.first_common_ancestor
TreeNode = _m.TreeNode


class TestFirstCommonAncestor:
    def test_returns_correct_common_ancestor(self):
        """returns correct common ancestor for valid input"""
        n4, n5, n6, n7 = TreeNode(4), TreeNode(5), TreeNode(6), TreeNode(7)
        n2 = TreeNode(2, left=n4, right=n5)
        n3 = TreeNode(3, left=n6, right=n7)
        root = TreeNode(1, left=n2, right=n3)
        assert first_common_ancestor(root, n2, n3) is root
        assert first_common_ancestor(root, n4, n5) is n2
        assert first_common_ancestor(root, n4, n7) is root
