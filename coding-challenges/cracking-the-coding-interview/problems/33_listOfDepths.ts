// 3. *List of Depths*:

// Given a binary tree, design an algorithm which creates a linked list
// of all the nodes at each depth (e.g., if you have a tree with depth D,
// you'll have D linked lists).

export type TreeNode<T> = {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
};

export type ListNode<T> = {
    value: T;
    next?: ListNode<T>;
};

export default function listOfDepths<T>(root: TreeNode<T> | null): ListNode<ListNode<number>>[] {
 
}