/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return;
  if (root === p || root === q) return root;

  const lca = lowestCommonAncestor(root.left, p, q);
  const rca = lowestCommonAncestor(root.right, p, q);

  if (lca && rca) return root;
  return lca || rca;
};