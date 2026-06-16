# 10. *Implement a Linked List*
#
# Create the data structure with the corresponding initial functions.

from __future__ import annotations
from typing import TypeVar, Generic, Optional, Callable

T = TypeVar("T")


class Node(Generic[T]):
    def __init__(self, value: T, next: Optional["Node[T]"] = None):
        self.value = value
        self.next = next


class LinkedList(Generic[T]):
    def __init__(self, head: Optional[Node[T]] = None):
        self.head: Optional[Node[T]] = head
        self.tail: Optional[Node[T]] = head
        self.length: int = 0
        def counter(index: int, value: T, node: Node[T]):
            self.length += 1
        self.visit(counter)

    def visit(self, callback: Callable[[int, T, Node[T]], None]) -> None:    
        pointer = self.head
        visited = {}
        index = 0
        while pointer:
            if pointer in visited:
                return pointer
            callback(index, pointer.value, pointer)
            visited[pointer] = True
            pointer = pointer.next
            index += 1

    def push(self, value: T) -> None:
        node = Node(value)
        if self.tail:
            self.tail.next = node
        else:
            self.head = node
        self.tail = node
        self.length += 1

    def get(self, index: int) -> Node[T] | None:
        pointer = self.head
        counter = 0
        while pointer:
            if counter == index:
                return pointer
            pointer = pointer.next
            counter += 1

    def remove_by_position(self, index: int) -> None:
        pointer = self.head
        counter = 0
        while pointer:
            if counter + 1 == index:
                if pointer.next:
                    pointer.next = pointer.next.next
                    break
            pointer = pointer.next

    def merge(self, other: "LinkedList[T]") -> None:
        if self.tail:
            self.tail.next = other.head
            self.tail = other.tail
        else:
            self.head = other.head
            self.tail = other.head
        self.length += other.length

    def to_array(self) -> list[T]:
        answer = []
        def str_node(index: int, value: T, node: Node[T]):
            answer.append(value)
        self.visit(str_node)
        return answer

    def filter(self, predicate: Callable[[T], bool]) -> "LinkedList[T]":
        new_list = LinkedList()
        if self.head:
            pointer = self.head
            while pointer:
                if not predicate(pointer.value):
                    new_list.push(Node(pointer.value))
                pointer = pointer.next 
        return new_list

    def print(self) -> None:
        values = []
        if self.head:
            pointer = self.head
            while pointer:
                values.append(str(pointer.value))
                pointer = pointer.next
        print(",".join(values))

