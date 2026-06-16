import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("34_check_balanced.py")
check_balanced = _m.check_balanced
TreeNode = _m.TreeNode


class TestCheckBalanced:
    def test_returns_true_for_balanced_tree(self):
        """returns true for a balanced tree"""
        root = TreeNode(1,
            left=TreeNode(2, left=TreeNode(4), right=TreeNode(5)),
            right=TreeNode(3, left=TreeNode(6), right=TreeNode(7)),
        )
        assert check_balanced(root) == True

    def test_returns_false_for_unbalanced_tree(self):
        """returns false for an unbalanced tree"""
        root = TreeNode(1, left=TreeNode(2, left=TreeNode(3, left=TreeNode(4))))
        assert check_balanced(root) == False

    def test_returns_true_for_empty_tree(self):
        """returns true for an empty tree"""
        assert check_balanced(None) == True
