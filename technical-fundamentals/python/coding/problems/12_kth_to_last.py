# 12. Return Kth to Last:
# Implement an algorithm to find the kth to last element of a singly linked list.

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def kth_to_last(head: Node[T], k: int) -> Optional[Node[T]]:
    linked_list = LinkedList(head)

    return linked_list.get(linked_list.length - k)

    # if k < 1:
    #     return None

    # length = 0
    # pointer = head
    # while pointer:
    #     length += 1
    #     pointer = pointer.next

    # if k > length:
    #     return None

    # counter = 0
    # pointer = head
    # while pointer and counter < length - k:
    #     counter += 1
    #     pointer = pointer.next

    # return pointer
