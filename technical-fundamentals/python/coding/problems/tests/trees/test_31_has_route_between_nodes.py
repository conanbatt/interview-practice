import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("31_has_route_between_nodes.py")
has_route_between_nodes = _m.has_route_between_nodes
GraphNode = _m.GraphNode


class TestHasRouteBetweenNodes:
    def test_has_route_between_connected_nodes(self):
        """has route between connected nodes"""
        n1, n2, n3, n4, n5, n6 = (
            GraphNode(1), GraphNode(2), GraphNode(3),
            GraphNode(4), GraphNode(5), GraphNode(6),
        )
        n1.neighbors = [n2, n5]
        n2.neighbors = [n3]
        n3.neighbors = [n4, n6]
        n6.neighbors = [n3]
        assert has_route_between_nodes(n1, n4) == True
        assert has_route_between_nodes(n4, n1) == False
        assert has_route_between_nodes(n2, n5) == False
        assert has_route_between_nodes(n1, n6) == True

    def test_no_route_between_disconnected_nodes(self):
        """no route between disconnected nodes"""
        n1, n2, n3 = GraphNode(1), GraphNode(2), GraphNode(3)
        assert has_route_between_nodes(n1, n2) == False
        assert has_route_between_nodes(n2, n3) == False
        assert has_route_between_nodes(n1, n3) == False
