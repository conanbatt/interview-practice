import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("35_validate_bst.py")
validate_bst = _m.validate_bst
TreeNode = _m.TreeNode


class TestValidateBST:
    def test_returns_true_for_valid_bst(self):
        """returns true for a valid BST"""
        root = TreeNode(2, left=TreeNode(1), right=TreeNode(3))
        assert validate_bst(root) == True

    def test_returns_false_for_invalid_bst(self):
        """returns false for an invalid BST"""
        root = TreeNode(1, left=TreeNode(2), right=TreeNode(3))
        assert validate_bst(root) == False

    def test_returns_false_for_invalid_bst_2(self):
        """returns false for an invalid BST #2"""
        root = TreeNode(3,
            left=TreeNode(2, left=TreeNode(1), right=TreeNode(4)),
            right=TreeNode(5),
        )
        assert validate_bst(root) == False

    def test_returns_true_for_empty_tree(self):
        """returns true for an empty tree"""
        assert validate_bst(None) == True

    def test_returns_true_for_single_node(self):
        """returns true for a single node tree"""
        assert validate_bst(TreeNode(5)) == True
