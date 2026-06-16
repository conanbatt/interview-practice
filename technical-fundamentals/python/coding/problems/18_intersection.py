# 18. Intersection:
# Given two (singly) linked lists, determine if the two lists intersect.
# Return the first intersecting node. Note that the intersection is defined
# based on reference, not value.

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def intersection(
    list1: Optional[Node[T]],
    list2: Optional[Node[T]],
) -> Optional[Node[T]]:
    items = []
    def pick(index: int, value: T, node: Node[T]):
        items.append(node)
    ll1 = LinkedList(list1)
    ll1.visit(pick)

    answer = None
    def check(index: int, value: T, node: Node[T]):
        nonlocal answer
        if node in items and answer is None:
            answer = node
    
    ll2 = LinkedList(list2)
    ll2.visit(check)

    return answer

    # p1 = list1
    # while p1:
    #     p2 = list2
    #     while p2:
    #         if p1 == p2:
    #             return p1
    #         p2 = p2.next
    #     p1 = p1.next
    # return None
