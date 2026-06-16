import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("22_stack_min.py")
StackMin = _m.StackMin


class TestStackMin:
    def test_push_pop_and_min(self):
        """push and pop elements from stack"""
        s = StackMin()
        s.push(5); s.push(2); s.push(8); s.push(1)
        assert s.min() == 1
        assert s.pop() == 1
        assert s.min() == 2
        assert s.pop() == 8
        assert s.min() == 2
        assert s.pop() == 2
        assert s.min() == 5
        assert s.pop() == 5
        assert s.min() is None

    def test_min_returns_none_when_empty(self):
        """min method returns undefined when stack is empty"""
        s = StackMin()
        assert s.min() is None

    def test_push_pop_mixed_with_min(self):
        """push and pop mixed with min operations"""
        s = StackMin()
        s.push(3); assert s.min() == 3
        s.push(5); assert s.min() == 3
        s.push(2); assert s.min() == 2
        s.push(1); assert s.min() == 1
        assert s.pop() == 1; assert s.min() == 2
        assert s.pop() == 2; assert s.min() == 3
        s.push(0); assert s.min() == 0
        assert s.pop() == 0; assert s.min() == 3
        assert s.pop() == 5; assert s.min() == 3
        assert s.pop() == 3; assert s.min() is None
