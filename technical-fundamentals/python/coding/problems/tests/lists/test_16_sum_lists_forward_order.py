import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("16_sum_lists_forward_order.py")
sum_lists_forward_order = _m.sum_lists_forward_order
Node = _m.Node


def _equal(a, b):
    while a and b:
        if a.value != b.value:
            return False
        a, b = a.next, b.next
    return a is None and b is None


class TestSumListsForwardOrder:
    def test_sums_one_element_each_without_carryover(self):
        """Sums one element each without carryover"""
        assert _equal(sum_lists_forward_order(Node(1), Node(2)), Node(3))

    def test_sums_two_elements_each_without_carryover(self):
        """Sums two elements each without carryover"""
        l1 = Node(1, Node(3))
        l2 = Node(2, Node(3))
        expected = Node(3, Node(6))
        assert _equal(sum_lists_forward_order(l1, l2), expected)

    def test_sums_without_carryover(self):
        """sums two non-empty lists without carryover"""
        l1 = Node(1, Node(2, Node(3)))
        l2 = Node(4, Node(5, Node(6)))
        expected = Node(5, Node(7, Node(9)))
        assert _equal(sum_lists_forward_order(l1, l2), expected)

    def test_sums_with_carryover(self):
        """sums two non-empty lists with carryover"""
        l1 = Node(9, Node(9, Node(9)))
        l2 = Node(1)
        expected = Node(1, Node(0, Node(0, Node(0))))
        assert _equal(sum_lists_forward_order(l1, l2), expected)

    def test_sums_different_lengths(self):
        """sums two lists with different lengths"""
        l1 = Node(1, Node(2, Node(3, Node(4))))
        l2 = Node(5, Node(6))
        expected = Node(1, Node(2, Node(9, Node(0))))
        assert _equal(sum_lists_forward_order(l1, l2), expected)

    def test_sums_two_empty_lists(self):
        """sums two empty lists"""
        assert sum_lists_forward_order(None, None) is None

    def test_sums_one_empty_and_one_non_empty(self):
        """sums one empty list and one non-empty list"""
        l1 = Node(1, Node(2, Node(3)))
        result = sum_lists_forward_order(l1, None)
        assert _equal(result, l1)
