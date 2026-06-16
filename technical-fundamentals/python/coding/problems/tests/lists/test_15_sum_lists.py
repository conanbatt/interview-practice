import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("15_sum_lists.py")
sum_lists = _m.sum_lists
Node = _m.Node


def _equal(a, b):
    while a and b:
        if a.value != b.value:
            return False
        a, b = a.next, b.next
    return a is None and b is None


class TestSumLists:
    def test_sums_two_lists_without_carryover(self):
        """sums two non-empty lists without carryover"""
        list1 = Node(1, Node(2, Node(3)))
        list2 = Node(4, Node(5, Node(6)))
        expected = Node(5, Node(7, Node(9)))
        assert _equal(sum_lists(list1, list2), expected)

    def test_sums_two_lists_with_carryover(self):
        """sums two non-empty lists with carryover"""
        list1 = Node(9, Node(9, Node(9)))
        list2 = Node(1)
        expected = Node(0, Node(0, Node(0, Node(1))))
        assert _equal(sum_lists(list1, list2), expected)

    def test_sums_lists_with_different_lengths(self):
        """sums two lists with different lengths"""
        list1 = Node(1, Node(2, Node(3, Node(4))))
        list2 = Node(5, Node(6))
        expected = Node(6, Node(8, Node(3, Node(4))))
        assert _equal(sum_lists(list1, list2), expected)
