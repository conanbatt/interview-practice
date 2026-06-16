import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("25_sort_stack.py")
SortStack = _m.SortStack


class TestSortStack:
    def test_push_elements_in_sorted_order(self):
        """push elements in sorted order"""
        s = SortStack()
        s.push(3); assert s.peek() == 3
        s.push(1); assert s.peek() == 1
        s.push(5); assert s.peek() == 1
        s.push(2); assert s.peek() == 1
        s.push(4); assert s.peek() == 1

    def test_pop_elements_in_sorted_order(self):
        """pop elements in sorted order"""
        s = SortStack()
        s.push(3); s.push(1); s.push(5); s.push(2); s.push(4)
        assert s.pop() == 1
        assert s.pop() == 2
        assert s.pop() == 3
        assert s.pop() == 4
        assert s.pop() == 5
        assert s.pop() is None

    def test_peek_does_not_remove_element(self):
        """peek returns the top element without removing it"""
        s = SortStack()
        s.push(3); s.push(1); s.push(5)
        assert s.peek() == 1
        assert s.peek() == 1

    def test_is_empty_returns_true_for_empty_stack(self):
        """isEmpty returns true for empty stack"""
        assert SortStack().is_empty() == True

    def test_is_empty_returns_false_for_non_empty(self):
        """isEmpty returns false for non-empty stack"""
        s = SortStack()
        s.push(1)
        assert s.is_empty() == False
