import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("30_trees.py")
Tree = _m.Tree
TreeNode = _m.TreeNode


class TestTrees:
    def test_dfs_navigates_tree_in_order(self):
        """dfs navigates the tree in order"""
        root = TreeNode(1,
            left=TreeNode(2, left=TreeNode(3), right=TreeNode(4)),
            right=TreeNode(5, left=TreeNode(6, left=TreeNode(7)), right=TreeNode(8)),
        )
        tree = Tree()
        order = []
        tree.dfs(root, lambda node: order.append(node))
        assert [n.value for n in order] == [1, 2, 3, 4, 5, 6, 7, 8]

    def test_bfs_navigates_tree_in_order(self):
        """bfs navigates the tree in order"""
        root = TreeNode(1,
            left=TreeNode(2, left=TreeNode(4), right=TreeNode(5)),
            right=TreeNode(3, left=TreeNode(6, left=TreeNode(8)), right=TreeNode(7)),
        )
        tree = Tree()
        order = []
        tree.bfs(root, lambda node: order.append(node))
        assert [n.value for n in order] == [1, 2, 3, 4, 5, 6, 7, 8]
