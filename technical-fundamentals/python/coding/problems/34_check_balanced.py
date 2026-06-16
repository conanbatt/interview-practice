# 34. Check Balanced:
# Implement a function to check if a binary tree is balanced.
# For the purposes of this question, a balanced tree is defined to be a tree such that
# the heights of the two subtrees of any node never differ by more than one.

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

def check_length(tree: Optional[TreeNode[T]]) -> bool:
    if not tree:
        return 0

    return max([
        check_length(tree.left),
        check_length(tree.right)
    ]) + 1

def check_balanced(tree: Optional[TreeNode[T]]) -> bool:
    if not tree:
        return True

    left = check_length(tree.left)
    right = check_length(tree.right)

    return abs(left-right) <= 1
