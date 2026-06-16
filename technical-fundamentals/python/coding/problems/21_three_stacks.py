# 21. Three in One:
# Describe how you could use a single array to implement three stacks.

from typing import TypeVar, Generic, Optional, List

T = TypeVar("T")


class ThreeStacks(Generic[T]):
    def __init__(self, array_length: int):
        self.array = [None] * array_length 
        self.length = [0] * 3
        self.total = 0

    def push(self, stack_num: int, value: T) -> None:
        array_len = self.length[stack_num]
        self.array[array_len * 3 + stack_num] = value 
        self.length[stack_num] += 1


    def pop(self, stack_num: int) -> Optional[T]:
        array_len = self.length[stack_num]
        if array_len == 0:
            return None
            
        answer = self.array[(array_len - 1) * 3 + stack_num]
        self.array[(array_len - 1) * 3 + stack_num] = None
        self.length[stack_num] -= 1
        return answer

    def peek(self, stack_num: int) -> Optional[T]:
        array_len = self.length[stack_num]
        if array_len == 0:
            return None
        return self.array[(array_len - 1) * 3 + stack_num]
