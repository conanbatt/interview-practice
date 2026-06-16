# 24. Queue via Stacks:
# Implement a MyQueue class which implements a queue using two stacks.

from typing import TypeVar, Generic, Optional

T = TypeVar("T")


class MyQueue(Generic[T]):
    def __init__(self):
        self.stack = []
        self.inverted = []

    def enqueue(self, value: T) -> None:
        if not self.stack:
            while self.inverted:
                self.stack.append(self.inverted.pop())
        self.stack.append(value)


    def dequeue(self) -> Optional[T]:
        if not self.inverted:
            while self.stack:
                self.inverted.append(self.stack.pop())
        if self.inverted:
            return self.inverted.pop()

    def peek(self) -> Optional[T]:
        if not self.inverted:
            while self.stack:
                self.inverted.append(self.stack.pop())
        if self.inverted:
            return self.inverted[-1]

    def is_empty(self) -> bool:
        return not self.stack and not self.inverted
