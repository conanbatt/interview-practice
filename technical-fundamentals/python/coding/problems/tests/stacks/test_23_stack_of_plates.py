import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("23_stack_of_plates.py")
StackOfPlates = _m.StackOfPlates


class TestStackOfPlates:
    def test_push_and_pop(self):
        """push and pop elements from stack"""
        s = StackOfPlates(3)
        s.push(1); s.push(2); s.push(3)
        assert s.pop() == 3
        assert s.pop() == 2
        assert s.pop() == 1
        assert s.pop() is None
        s.push(4); s.push(5); s.push(6)
        assert s.pop() == 6
        assert s.pop() == 5
        assert s.pop() == 4
        assert s.pop() is None

    def test_push_and_pop_across_multiple_stacks(self):
        """push and pop elements from multiple stacks"""
        s = StackOfPlates(2)
        s.push(1); s.push(2); s.push(3); s.push(4); s.push(5)
        assert s.pop() == 5
        assert s.pop() == 4
        assert s.pop() == 3
        assert s.pop() == 2
        assert s.pop() == 1
        assert s.pop() is None

    def test_pop_from_empty_returns_none(self):
        """pop from empty stack returns undefined"""
        s = StackOfPlates(2)
        assert s.pop() is None

    def test_push_beyond_capacity_creates_new_stack(self):
        """push beyond capacity creates new stack"""
        s = StackOfPlates(2)
        s.push(1); s.push(2); s.push(3); s.push(4)
        assert s.pop() == 4
        assert s.pop() == 3
