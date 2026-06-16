# 17. Palindrome:
# Implement a function to check if a linked list is a palindrome.

from __future__ import annotations
from typing import TypeVar, Generic, Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def is_palindrome(head: Optional[Node[T]]) -> bool:
    # pointer = head
    # normal = []
    # opposite = []
    # while pointer:
    #     normal.append(pointer.value)
    #     opposite.insert(0, pointer.value)
    #     pointer = pointer.next
    # return normal == opposite

    text = "".join(str(x) for x in LinkedList(head).to_array())
    return text == text[::-1]
