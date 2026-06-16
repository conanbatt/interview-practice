import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("39_bst_sequences.py")
bst_sequences = _m.bst_sequences
TreeNode = _m.TreeNode


class TestBstSequences:
    def test_returns_correct_sequences_for_3_nodes(self):
        """returns correct sequences for valid input with 3 nodes"""
        root = TreeNode(2, left=TreeNode(1), right=TreeNode(3))
        result = bst_sequences(root)
        assert [2, 1, 3] in result
        assert [2, 3, 1] in result

    def test_returns_correct_sequences_for_7_nodes(self):
        """returns correct sequences for valid input"""
        root = TreeNode(5,
            left=TreeNode(3, left=TreeNode(2), right=TreeNode(4)),
            right=TreeNode(7, left=TreeNode(6), right=TreeNode(8)),
        )
        result = bst_sequences(root)
        assert len(result) == 80
        assert [5, 3, 7, 2, 4, 6, 8] in result
        assert [5, 7, 3, 2, 4, 6, 8] in result
