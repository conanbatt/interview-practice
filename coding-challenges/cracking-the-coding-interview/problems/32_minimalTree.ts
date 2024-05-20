// 2. *Minimal Tree*: 

// Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.

export type TreeNode<T> = {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
};

export default function minimalTree<T>(sortedArray: T[]): TreeNode<T> | undefined {

}

