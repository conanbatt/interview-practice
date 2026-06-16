# 16. Sum Lists (Forward Order):
# Suppose the digits are stored in forward order. Repeat the above problem.
#
# EXAMPLE
# Input: (6 -> 1 -> 7) + (2 -> 9 -> 5). That is, 617 + 295.
# Output: 9 -> 1 -> 2. That is, 912.

from __future__ import annotations
from typing import Optional
from importlib import import_module

linked_list = import_module("coding.problems.10_linked_list")
LinkedList = linked_list.LinkedList
Node = linked_list.Node
T = linked_list.T


def invert_order(node: Optional[Node]) -> Optional[Node]:
    pointer = node
    previous = None
    while pointer:
        old = pointer
        pointer = pointer.next
        old.next = previous
        previous = old
    return previous

def sum_lists_forward_order(
    list1: Optional[Node],
    list2: Optional[Node],
) -> Optional[Node]:

    if not list1 and not list2:
        return None

    if not list1:
        return list2
    if not list2:
        return list1
    
    ll1 = "".join(str(x) for x in LinkedList(list1).to_array())
    ll2 = "".join(str(x) for x in LinkedList(list2).to_array())
    suma = int(ll1) + int(ll2)
    linked_list = LinkedList()
    for c in str(suma):
        linked_list.push(int(c))
    return linked_list.head


    # if not list1 and not list2:
    #     return None

    # if not list1 or not list2:
    #     return list1 or list2
        
    # list1 = invert_order(list1)
    # list2 = invert_order(list2)
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


    # return invert_order(dummy.next)
