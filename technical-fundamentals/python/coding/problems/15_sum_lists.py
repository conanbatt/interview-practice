# 15. Sum Lists:
# You have two numbers represented by a linked list, where each node contains a
# single digit. The digits are stored in reverse order, such that the 1's digit is
# at the head of the list. Write a function that adds the two numbers and returns
# the sum as a linked list.
#
# EXAMPLE
# Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295.
# Output: 2 -> 1 -> 9. That is, 912.

from __future__ import annotations
from typing import Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def sum_lists(
    list1: Optional[Node],
    list2: Optional[Node],
) -> Optional[Node]:
    
    ll1 = "".join(str(x) for x in LinkedList(list1).to_array())
    ll2 = "".join(str(x) for x in LinkedList(list2).to_array())
    suma = int(ll1[::-1]) + int(ll2[::-1])
    linked_list = LinkedList()
    for c in str(suma)[::-1]:
        linked_list.push(int(c))
    return linked_list.head




    # total = 0
    # carry = 0
    # dummy  = Node(0)
    # pointer = dummy
    # while list1 or list2:
    #     value1 = list1.value if list1 else 0
    #     value2 = list2.value if list2 else 0
    #     total = value1 + value2 + carry
    #     pointer.next = Node(total % 10)
    #     pointer = pointer.next
    #     carry = total // 10
    #     list1 = list1.next if list1 else None
    #     list2 = list2.next if list2 else None

    # if carry:
    #     pointer.next = Node(carry)

    # return dummy.next

