# 23. Stack of Plates:
# Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
# Therefore, in real life, we would likely start a new stack when the previous stack
# exceeds some threshold. Implement a data structure SetOfStacks that mimics this.
# SetOfStacks should be composed of several stacks and should create a new stack once
# the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should
# behave identically to a single stack.
#
# FOLLOW UP: Implement a function pop_at(index) which performs a pop on a specific sub-stack.

from typing import TypeVar, Generic, Optional

T = TypeVar("T")


class StackOfPlates(Generic[T]):
    def __init__(self, capacity: int):
        self.stacks = []
        self.capacity = 0
        self.max_capacity = capacity
        self.total_stacks = 0

    def push(self, value: T) -> None:
        if not self.stacks or self.capacity == self.max_capacity:
            self.capacity = 0
            self.stacks.append([])
            self.total_stacks += 1
        self.stacks[-1].append(value)
        self.capacity += 1

    def pop(self) -> Optional[T]:
        if not self.stacks:
            return None

        answer = self.stacks[-1].pop()
        if self.capacity == 1:
            self.capacity = self.max_capacity
            self.stacks.pop()
            self.total_stacks -= 1
        else:
            self.capacity -= 1
        return answer

    def pop_at(self, index: int):
        stack_index = index // self.max_capacity
        inside_index = index % self.max_capacity
        inside_index, stack_index = divmod(index, self.max_capacity)
        answer = self.stacks[stack_index].pop(inside_index)
        for i in range(stack_index, self.total_stacks - 1):
            self.stacks[i].append(self.stacks[i+1].pop(0))
        if self.capacity == 1:
            self.capacity = self.max_capacity
            self.stacks.pop()
            self.total_stacks -= 1
        else:
            self.capacity -= 1



