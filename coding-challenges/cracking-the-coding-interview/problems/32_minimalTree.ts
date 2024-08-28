// 2. *Minimal Tree*:

// Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.
//
// A binary search tree is a search where for each node,
// lesser elements are on the left node, and greater elements on the right node.
//
// Input: [1,2,3,4,5,6,7,8]
// Output:
//      5
//   2  |  7
// 1   3|6   8
//
//

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export default function minimalTree<T>(
  sortedArray: T[],
): TreeNode<T> | undefined {}
