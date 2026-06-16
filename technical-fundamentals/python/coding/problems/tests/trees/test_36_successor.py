import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("36_successor.py")
successor = _m.successor
TreeNode = _m.TreeNode


class TestSuccessor:
    def test_returns_correct_in_order_successor(self):
        """returns correct in-order successor"""
        n2, n4, n6, n8 = TreeNode(2), TreeNode(4), TreeNode(6), TreeNode(8)
        n3 = TreeNode(3, left=n2, right=n4)
        n7 = TreeNode(7, left=n6, right=n8)
        n5 = TreeNode(5, left=n3, right=n7)
        n2.parent = n3; n4.parent = n3; n3.parent = n5
        n6.parent = n7; n8.parent = n7; n7.parent = n5
        assert successor(n2).value == 3
        assert successor(n3).value == 4
        assert successor(n4).value == 5
        assert successor(n5).value == 6
        assert successor(n6).value == 7
        assert successor(n7).value == 8
        assert successor(n8) is None

    def test_returns_none_for_node_without_successor(self):
        """returns undefined for node without successor"""
        assert successor(TreeNode(1)) is None
