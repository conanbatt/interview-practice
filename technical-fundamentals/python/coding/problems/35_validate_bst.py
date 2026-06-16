# 35. Validate BST:
# Implement a function to check if a binary tree is a binary search tree.

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

def max_tree(node: Optional[TreeNode[T]]) -> int | None:
    if not node:
        return None

    to_check = [node.value]
    max_left = max_tree(node.left)
    if max_left is not None:
        to_check.append(max_left)
    max_right = max_tree(node.right)
    if max_right is not None:
        to_check.append(max_right)
    return max(
        to_check
    )


def validate_bst(node: Optional[TreeNode[T]]) -> bool:
    if not node:
        return True

    max_left = max_tree(node.left)
    max_right = max_tree(node.right)

    return (
        (max_left is None or max_left <= node.value ) and
        (max_right is None or max_right >= node.value)
        )
