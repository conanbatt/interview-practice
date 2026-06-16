import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("17_palindrome.py")
is_palindrome = _m.is_palindrome
Node = _m.Node


class TestIsPalindrome:
    def test_single_node_list_is_palindrome(self):
        """single node list is palindrome"""
        assert is_palindrome(Node(1)) == True

    def test_palindrome_list_with_odd_number_of_nodes(self):
        """palindrome list with odd number of nodes"""
        n1, n2, n3, n4, n5 = Node(1), Node(2), Node(3), Node(2), Node(1)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        assert is_palindrome(n1) == True

    def test_non_palindrome_list(self):
        """non-palindrome list"""
        n1, n2, n3, n4, n5 = Node(1), Node(2), Node(3), Node(4), Node(5)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        assert is_palindrome(n1) == False

    def test_palindrome_list_with_even_number_of_nodes(self):
        """palindrome list with even number of nodes"""
        n1, n2, n3, n4 = Node(1), Node(2), Node(2), Node(1)
        n1.next, n2.next, n3.next = n2, n3, n4
        assert is_palindrome(n1) == True
