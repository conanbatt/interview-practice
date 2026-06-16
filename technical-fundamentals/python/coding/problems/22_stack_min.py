# 22. Stack Min:
# How would you design a stack which, in addition to push and pop, has a function
# min which returns the minimum element?
# Push, pop, and min should all operate in O(1) time.

from typing import TypeVar, Generic, Optional

T = TypeVar("T")


class StackMin(Generic[T]):
    def __init__(self):
        self.array = []

    def push(self, value: T) -> None:
        if not self.array:
            self.array.append((value, value))
        else:
            actual_min = self.array[-1][1]
            self.array.append((value, min(value, actual_min)))

    def pop(self) -> Optional[T]:
        return self.array.pop()[0]

    def min(self) -> Optional[T]:
        if not self.array:
            return None

        return self.array[-1][1]
