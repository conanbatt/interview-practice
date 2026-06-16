# 11. Remove Dups:
# Write code to remove duplicates from an unsorted linked list.
# FOLLOW UP: How would you solve this problem if a temporary buffer is not allowed?
#
# 1 -> 2 -> 2 -> 2 -> 4

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def remove_dups(head: Optional[Node[T]] = None) -> Optional[Node[T]]:
    lista = LinkedList(head)

    if lista.length == 1:
        return head

    new_list = LinkedList()
    hashmap = {}
    
    def add_if_not_duplicate(index: int, value: T, node: Node[T]):
        if value not in hashmap:
            new_list.push(value)
            hashmap[value] = True
    
    lista.visit(add_if_not_duplicate)
    lista.print()
    new_list.print()
    return new_list.head
    
    # pointer = head
    # while pointer and pointer.next:
    #     if pointer.value == pointer.next.value:
    #         pointer.next = pointer.next.next
    #     else:
    #         pointer = pointer.next
    # return head
