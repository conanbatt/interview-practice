# 38. First Common Ancestor:
# Design an algorithm and write code to find the first common ancestor of two nodes
# in a binary tree. Avoid storing additional nodes in a data structure.
# NOTE: This is not necessarily a binary search tree.

from __future__ import annotations
from typing import TypeVar, Generic, Optional

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


def find(node, q, path):
    if node is None:
        return None

    if node is q:
        return path

    for n in [node.left, node.right]:
        if n:
            path.append(n)
            if find(n, q, path):
                return path
            path.pop()


def first_common_ancestor(
    root: Optional[TreeNode[T]],
    p: TreeNode[T],
    q: TreeNode[T],
) -> Optional[TreeNode[T]]:
    answer = find(root, p, [root])
    while answer:
        node = answer.pop()
        if find(node, q, []):
            return node


