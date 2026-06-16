# 33. List of Depths:
# Given a binary tree, design an algorithm which creates a linked list of all the
# nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).

from __future__ import annotations
from typing import TypeVar, Generic, Optional, List

T = TypeVar("T")


class TreeNode(Generic[T]):
    def __init__(
        self,
        value: T,
        left: Optional["TreeNode[T]"] = None,
        right: Optional["TreeNode[T]"] = None,
    ):
        self.value = value
        self.left = left
        self.right = right


class ListNode(Generic[T]):
    def __init__(self, value: T, next: Optional["ListNode[T]"] = None):
        self.value = value
        self.next = next



def dfs(node, depth, answer):
    if not node:
        return answer

    len_answer = len(answer)
    to_traverse = []
    for n in [node.left, node.right]:
        if n:
            if depth == len_answer:
                answer.append([])
            answer[depth].append(n.value)
            to_traverse.append(n)

    for n in to_traverse:
        dfs(n, depth+1, answer)

    return answer

def list_of_depths(root: Optional[TreeNode[T]]) -> List[ListNode[T]]:
    if not root:
        return []

    answer = []

    answer.append([root.value])
    dfs(root, 1, answer)

    returned = []
    for a in answer:
        dummy = ListNode(0)
        pointer = dummy
        for x in a:
            n = ListNode(x)
            pointer.next = n
            pointer = pointer.next
        returned.append(dummy.next)

    return returned