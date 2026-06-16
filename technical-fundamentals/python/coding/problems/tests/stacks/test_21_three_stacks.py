import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("21_three_stacks.py")
ThreeStacks = _m.ThreeStacks


class TestThreeStacks:
    def test_push_and_pop_from_stack_0(self):
        """push and pop elements from stack 1"""
        s = ThreeStacks(9)
        s.push(0, 1); s.push(0, 2); s.push(0, 3)
        assert s.pop(0) == 3
        assert s.pop(0) == 2
        assert s.pop(0) == 1
        assert s.pop(0) is None

    def test_push_and_pop_from_stack_1(self):
        """push and pop elements from stack 2"""
        s = ThreeStacks(9)
        s.push(1, 4); s.push(1, 5); s.push(1, 6)
        assert s.pop(1) == 6
        assert s.pop(1) == 5
        assert s.pop(1) == 4
        assert s.pop(1) is None

    def test_push_and_pop_from_stack_2(self):
        """push and pop elements from stack 3"""
        s = ThreeStacks(9)
        s.push(2, 7); s.push(2, 8); s.push(2, 9)
        assert s.pop(2) == 9
        assert s.pop(2) == 8
        assert s.pop(2) == 7
        assert s.pop(2) is None

    def test_pop_from_empty_stack_returns_none(self):
        """pop elements from empty stack"""
        s = ThreeStacks(3)
        assert s.pop(0) is None
        assert s.pop(1) is None
        assert s.pop(2) is None

    def test_peek_elements_from_stacks(self):
        """peek elements from stacks"""
        s = ThreeStacks(3)
        s.push(0, 1); s.push(1, 2); s.push(2, 3)
        assert s.peek(0) == 1
        assert s.peek(1) == 2
        assert s.peek(2) == 3

    def test_peek_from_empty_stack_returns_none(self):
        """peek elements from empty stack"""
        s = ThreeStacks(3)
        assert s.peek(0) is None
        assert s.peek(1) is None
        assert s.peek(2) is None
