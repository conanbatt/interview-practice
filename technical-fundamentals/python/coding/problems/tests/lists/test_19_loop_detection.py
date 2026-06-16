import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("19_loop_detection.py")
detect_loop = _m.detect_loop
Node = _m.Node


class TestLoopDetection:
    def test_returns_none_for_single_node(self):
        """returns null if the list has only one node"""
        assert detect_loop(Node(1)) is None

    def test_returns_none_for_list_without_loop(self):
        """returns null if the list does not have a loop"""
        head = Node(1, Node(2, Node(3, Node(4, Node(5)))))
        assert detect_loop(head) is None

    def test_returns_node_at_beginning_of_loop(self):
        """returns the node at the beginning of the loop"""
        loop_node = Node(31, Node(32))
        loop_node.next.next = loop_node
        head = Node(1, Node(2, Node(3, Node(4, Node(5, Node(6, Node(7, Node(8, Node(9, loop_node)))))))))
        assert detect_loop(head) is loop_node

    def test_returns_node_at_beginning_of_longer_loop(self):
        """returns the node at the beginning of the loop (longer loop)"""
        loop_node = Node(11, Node(12, Node(13)))
        loop_node.next.next.next = loop_node
        head = Node(1, Node(2, Node(3, Node(4, Node(5, Node(6, Node(7, Node(8, Node(9, Node(10, loop_node))))))))))
        assert detect_loop(head) is loop_node
