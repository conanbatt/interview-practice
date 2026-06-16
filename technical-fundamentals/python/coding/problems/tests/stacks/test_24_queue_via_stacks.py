import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("24_queue_via_stacks.py")
MyQueue = _m.MyQueue


class TestMyQueue:
    def test_enqueue_and_dequeue(self):
        """enqueue and dequeue elements from queue"""
        q = MyQueue()
        q.enqueue(1); q.enqueue(2); q.enqueue(3)
        assert q.dequeue() == 1
        assert q.dequeue() == 2
        assert q.dequeue() == 3
        assert q.dequeue() is None

    def test_enqueue_dequeue_mixed_with_peek(self):
        """enqueue and dequeue mixed with peek operations"""
        q = MyQueue()
        q.enqueue(1); assert q.peek() == 1
        q.enqueue(2); assert q.peek() == 1
        assert q.dequeue() == 1; assert q.peek() == 2
        q.enqueue(3); assert q.peek() == 2
        assert q.dequeue() == 2; assert q.peek() == 3
        assert q.dequeue() == 3; assert q.peek() is None

    def test_peek_from_empty_returns_none(self):
        """peek from empty queue returns undefined"""
        assert MyQueue().peek() is None

    def test_is_empty_returns_true_for_empty_queue(self):
        """isEmpty returns true for empty queue"""
        assert MyQueue().is_empty() == True

    def test_is_empty_returns_false_for_non_empty_queue(self):
        """isEmpty returns false for non-empty queue"""
        q = MyQueue()
        q.enqueue(1)
        assert q.is_empty() == False
