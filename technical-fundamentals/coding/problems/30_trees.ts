// Write the basic tree algorithms of Depth-first-search and Breadth-first search.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export class Tree<T> {
  bfs(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {}

  dfs(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {}
}
