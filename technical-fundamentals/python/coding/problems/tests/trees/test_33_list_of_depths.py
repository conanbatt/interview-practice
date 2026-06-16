import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("33_list_of_depths.py")
list_of_depths = _m.list_of_depths
TreeNode = _m.TreeNode
ListNode = _m.ListNode


def _list_values(node):
    vals = []
    while node:
        vals.append(node.value)
        node = node.next
    return vals


class TestListOfDepths:
    def test_creates_linked_lists_at_each_depth(self):
        """creates linked lists of nodes at each depth"""
        root = TreeNode(1,
            left=TreeNode(2, left=TreeNode(4, left=TreeNode(7)), right=TreeNode(5)),
            right=TreeNode(3, right=TreeNode(6)),
        )
        result = list_of_depths(root)
        assert len(result) == 4
        assert _list_values(result[0]) == [1]
        assert _list_values(result[1]) == [2, 3]
        assert _list_values(result[2]) == [4, 5, 6]
        assert _list_values(result[3]) == [7]

    def test_creates_linked_lists_for_single_node_tree(self):
        """creates linked lists for single node tree"""
        root = TreeNode(1)
        result = list_of_depths(root)
        assert len(result) == 1
        assert _list_values(result[0]) == [1]
