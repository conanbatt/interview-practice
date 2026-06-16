# 19. Loop Detection:
# Given a circular linked list, implement an algorithm that returns the node
# at the beginning of the loop.
#
# DEFINITION
# Circular linked list: A (corrupt) linked list in which a node's next pointer
# points to an earlier node, so as to make a loop in the linked list.
#
# EXAMPLE
# Input: A->B->C->D->E->C [the same C as earlier]
# Output: C

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def detect_loop(head: Optional[Node[T]]) -> Optional[Node[T]]:
    
    def visit(index: int, value: T, node: Node[T]):
        pass
    linked_list = LinkedList(head)
    return linked_list.visit(visit)

    # bag = []
    # pointer = head
    # while pointer:
    #     if pointer in bag:
    #         return pointer
    #     bag.append(pointer)
    #     pointer = pointer.next
    # return None
