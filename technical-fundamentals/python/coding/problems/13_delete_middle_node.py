# 13. Delete Middle Node:
# Implement an algorithm to delete a node in the middle
# (i.e., any node but the first and last node, not necessarily the exact middle)
# of a singly linked list, given only access to that node.
#
# EXAMPLE
# Input: the node c from the linked list a->b->c->d->e->f
# Result: nothing is returned, but the new linked list looks like a->b->d->e->f

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def delete_middle_node(head: Node[T], position: int) -> Optional[Node[T]]:
    linked_list = LinkedList(head)
    if position == 0 or position == linked_list.length - 1:
        return head

    linked_list.remove_by_position(position)
    return linked_list.head
    # if position == 0:
    #     return head

    # index = 0
    # previous = None
    # pointer = head
    # while pointer and index < position:
    #     previous = pointer
    #     pointer = pointer.next
    #     index += 1

    # if pointer and previous:
    #     previous.next = pointer.next

    # return head
