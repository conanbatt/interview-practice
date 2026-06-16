import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("13_delete_middle_node.py")
delete_middle_node = _m.delete_middle_node
Node = _m.Node


def _values(head):
    result = []
    cur = head
    while cur:
        result.append(cur.value)
        cur = cur.next
    return result


class TestDeleteMiddleNode:
    def test_deletes_middle_node_at_position_1(self):
        """deletes middle node at position 1"""
        n0 = Node(0)
        n0.next = Node(1)
        n0.next.next = Node(2)
        n0.next.next.next = Node(3)
        result = delete_middle_node(n0, 1)
        assert _values(result) == [0, 2, 3]

    def test_no_deletion_if_position_out_of_range(self):
        """no deletion if position is out of range"""
        head = Node(1)
        head.next = Node(2)
        head.next.next = Node(3)
        result = delete_middle_node(head, 4)
        assert _values(result) == [1, 2, 3]

    def test_no_deletion_if_position_less_than_1(self):
        """no deletion if position is less than 1"""
        head = Node(1)
        head.next = Node(2)
        head.next.next = Node(3)
        result = delete_middle_node(head, 0)
        assert _values(result) == [1, 2, 3]

    def test_no_deletion_if_list_has_only_one_node(self):
        """no deletion if list has only one node"""
        head = Node(1)
        result = delete_middle_node(head, 2)
        assert result.value == 1
        assert result.next is None

    def test_no_deletion_if_list_has_only_two_nodes(self):
        """no deletion if list has only two nodes"""
        head = Node(1)
        head.next = Node(2)
        result = delete_middle_node(head, 2)
        assert result.value == 1
        assert result.next.value == 2
        assert result.next.next is None
