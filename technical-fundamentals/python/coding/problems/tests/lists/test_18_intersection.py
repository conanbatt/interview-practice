import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("18_intersection.py")
intersection = _m.intersection
Node = _m.Node


class TestIntersection:
    def test_returns_none_if_lists_do_not_intersect(self):
        """returns null if the lists do not intersect"""
        list1 = Node(1, Node(2, Node(3, Node(4))))
        list2 = Node(5, Node(6, Node(7, Node(8))))
        assert intersection(list1, list2) is None

    def test_returns_intersection_node(self):
        """returns intersection node when lists intersect"""
        common = Node(7, Node(8, Node(9)))
        list1 = Node(1, Node(2, Node(3, Node(4, common))))
        list2 = Node(5, Node(6, common))
        assert intersection(list1, list2) is common

    def test_returns_intersection_at_head(self):
        """returns intersection node when lists intersect at the head"""
        common = Node(1, Node(2, Node(3)))
        assert intersection(common, common) is common

    def test_returns_intersection_at_end(self):
        """returns intersection node when lists intersect at the end"""
        list1 = Node(1, Node(2, Node(3, Node(4, Node(5, Node(6, Node(7)))))))
        list2 = Node(0, list1)
        assert intersection(list1, list2) is list1
