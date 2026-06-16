import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("32_minimal_tree.py")
minimal_tree = _m.minimal_tree
TreeNode = _m.TreeNode


def _tree_equal(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    return a.value == b.value and _tree_equal(a.left, b.left) and _tree_equal(a.right, b.right)


class TestMinimalTree:
    def test_creates_minimal_bst_from_3_elements(self):
        """creates minimal height BST from sorted array"""
        expected = TreeNode(2, left=TreeNode(1), right=TreeNode(3))
        assert _tree_equal(minimal_tree([1, 2, 3]), expected)

    def test_creates_minimal_bst_from_5_elements(self):
        """creates minimal height BST from sorted array 5 length"""
        expected = TreeNode(3, left=TreeNode(2, left=TreeNode(1)), right=TreeNode(5, left=TreeNode(4)))
        assert _tree_equal(minimal_tree([1, 2, 3, 4, 5]), expected)

    def test_creates_minimal_bst_from_7_elements(self):
        """creates minimal height BST from sorted array 7 length"""
        expected = TreeNode(4,
            left=TreeNode(2, left=TreeNode(1), right=TreeNode(3)),
            right=TreeNode(6, left=TreeNode(5), right=TreeNode(7)),
        )
        assert _tree_equal(minimal_tree([1, 2, 3, 4, 5, 6, 7]), expected)

    def test_returns_none_for_empty_array(self):
        """returns toBeUndefined for empty array"""
        assert minimal_tree([]) is None
