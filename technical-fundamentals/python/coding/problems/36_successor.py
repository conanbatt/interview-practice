# 36. Successor:
# Write an algorithm to find the "next" node (i.e., in-order successor) of a given
# node in a binary search tree. You may assume that each node has a link to its parent.

from __future__ import annotations
from typing import TypeVar, Generic, Optional

T = TypeVar("T")


class TreeNode(Generic[T]):
    def __init__(
        self,
        value: T,
        left: Optional["TreeNode[T]"] = None,
        right: Optional["TreeNode[T]"] = None,
        parent: Optional["TreeNode[T]"] = None,
    ):
        self.value = value
        self.left = left
        self.right = right
        self.parent = parent

def min_node(node: TreeNode[T]) -> Optional[TreeNode[T]]:
    if not node or not node.left:
        return node

    return min_node(node.left)

def successor(node: TreeNode[T]) -> Optional[TreeNode[T]]:
    if not node:
        return None

    if node.right is None:
        if not node.parent:
            return None

        pointer = node.parent
        while pointer and pointer.value < node.value:
            pointer = pointer.parent

        return pointer

    return min_node(node.right)
