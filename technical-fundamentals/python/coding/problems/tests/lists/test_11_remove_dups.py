import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("11_remove_dups.py")
remove_dups = _m.remove_dups
Node = _m.Node


def _node(value, next=None):
    n = Node(value)
    n.next = next
    return n


def _equal(a, b):
    while a and b:
        if a.value != b.value:
            return False
        a, b = a.next, b.next
    return a is None and b is None


class TestRemoveDups:
    def test_removes_duplicates(self):
        """remove duplicates on linked list"""
        n1, n2, n3 = Node("a"), Node("a"), Node("b")
        n1.next, n2.next = n2, n3
        result = remove_dups(n1)
        expected = Node("a")
        expected.next = Node("b")
        assert _equal(result, expected)

    def test_no_duplicates(self):
        """no duplicates in linked list"""
        n1, n2, n3 = Node("a"), Node("b"), Node("c")
        n1.next, n2.next = n2, n3
        result = remove_dups(n1)
        assert _equal(result, n1)

    def test_multiple_duplicates(self):
        """multiple duplicates in linked list"""
        n1, n2, n3 = Node("a"), Node("a"), Node("a")
        n1.next, n2.next = n2, n3
        result = remove_dups(n1)
        expected = Node("a")
        assert _equal(result, expected)

    def test_empty_list(self):
        """empty linked list"""
        assert remove_dups() is None

    def test_single_node(self):
        """linked list with one node"""
        n = Node("a")
        assert remove_dups(n) is n
