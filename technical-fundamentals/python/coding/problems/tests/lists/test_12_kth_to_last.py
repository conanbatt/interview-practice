import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("12_kth_to_last.py")
kth_to_last = _m.kth_to_last
Node = _m.Node


class TestKthToLast:
    def test_returns_none_if_k_is_less_than_1(self):
        """returns undefined if k is less than 1"""
        n = Node(1)
        assert kth_to_last(n, 0) is None

    def test_returns_none_if_k_greater_than_length(self):
        """returns undefined if k is greater than the length of the list"""
        n = Node(1)
        assert kth_to_last(n, 2) is None

    def test_returns_kth_to_last_element(self):
        """returns the kth to last element when k is valid"""
        n1, n2, n3, n4, n5 = Node(1), Node(2), Node(3), Node(4), Node(5)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        result = kth_to_last(n1, 2)
        assert result is n4

    def test_returns_head_if_k_equals_length(self):
        """returns the head if k is equal to the length of the list"""
        n1, n2, n3, n4, n5 = Node(1), Node(2), Node(3), Node(4), Node(5)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        assert kth_to_last(n1, 5) is n1
