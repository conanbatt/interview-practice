import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("14_partition.py")
partition = _m.partition
Node = _m.Node


def _values(head):
    result = []
    cur = head
    while cur:
        result.append(cur.value)
        cur = cur.next
    return result


class TestPartition:
    def test_partitions_the_list_correctly(self):
        """partitions the list correctly"""
        n1, n2, n3, n4, n5, n6, n7 = (
            Node(3), Node(5), Node(8), Node(5), Node(10), Node(2), Node(1),
        )
        n1.next, n2.next, n3.next, n4.next, n5.next, n6.next = n2, n3, n4, n5, n6, n7
        result = partition(n1, 5)
        vals = _values(result)
        left = [v for v in vals if v < 5]
        right = [v for v in vals if v >= 5]
        assert len(left) == 3
        assert len(right) == 4
        assert vals.index(left[-1]) < vals.index(right[0])

    def test_handles_single_node_list(self):
        """handles single node list correctly"""
        n = Node(5)
        result = partition(n, 5)
        assert result.value == 5
        assert result.next is None

    def test_handles_all_nodes_less_than_x(self):
        """handles all nodes less than x"""
        n1, n2, n3, n4, n5 = Node(3), Node(2), Node(1), Node(4), Node(5)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        result = partition(n1, 6)
        assert all(v < 6 for v in _values(result))

    def test_handles_all_nodes_greater_than_or_equal_to_x(self):
        """handles all nodes greater than or equal to x"""
        n1, n2, n3, n4, n5 = Node(3), Node(2), Node(1), Node(4), Node(5)
        n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n5
        result = partition(n1, 0)
        assert all(v >= 0 for v in _values(result))
