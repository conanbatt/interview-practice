# 25. Sort Stack:
# Write a program to sort a stack such that the smallest items are on the top.
# You can use an additional temporary stack, but you may not copy the elements
# into any other data structure (such as an array).
# The stack supports the following operations: push, pop, peek, and is_empty.

from typing import TypeVar, Generic, Optional

T = TypeVar("T")


class SortStack(Generic[T]):
    def __init__(self):
        self.stack = []

    def push(self, value: T) -> None:
        tmp_stack = []
        while self.stack:
            last_value = self.stack.pop()
            if value > last_value:
                tmp_stack.append(last_value)
            else:
                self.stack.append(last_value)
                break
        self.stack.append(value)
        while tmp_stack:
            self.stack.append(tmp_stack.pop())

    def pop(self) -> Optional[T]:
        if not self.stack:
            return None
        return self.stack.pop()

    def peek(self) -> Optional[T]:
        if not self.stack:
            return None
        return self.stack[-1]

    def is_empty(self) -> bool:
        return not self.stack
