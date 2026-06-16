# 14. Partition:
# Write code to partition a linked list around a value x, such that all nodes less
# than x come before all nodes greater than or equal to x. If x is contained within
# the list, the values of x only need to be after the elements less than x.
# The partition element x can appear anywhere in the "right partition".
#
# EXAMPLE
# Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition=5]
# Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def partition(head: Optional[Node[T]], x: T) -> Optional[Node[T]]:
    linked_list = LinkedList(head)
    left = LinkedList()
    right = LinkedList()
    def split(index:int, value: T, node: Node[T]):
        if value < x:
            left.push(value)
        else:
            right.push(value)
    linked_list.visit(split)
    left.merge(right)
    return left.head
    # left_dummy = Node(x)
    # right_dummy = Node(x)
    # left_pointer = left_dummy
    # right_pointer = right_dummy
    # pointer = head
    # while pointer:
    #     if pointer.value < x:
    #         left_pointer.next = pointer
    #         left_pointer = left_pointer.next
    #     else:
    #         right_pointer.next = pointer
    #         right_pointer = right_pointer.next
    #     pointer = pointer.next
    # right_pointer.next = None
    # left_pointer.next = right_dummy.next
    # return left_dummy.next