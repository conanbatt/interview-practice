// 5. *Validate BST*: Implement a function to check if a binary tree is a binary search tree.

class BinaryTreeNode {
  value;
  left;
  right;
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  root
  constructor(root) {
    this.root = root;
  }
}

const node1 = new BinaryTreeNode(1)
const node2 = new BinaryTreeNode(2)
const node3 = new BinaryTreeNode(3)
const node4 = new BinaryTreeNode(4)
const node5 = new BinaryTreeNode(5)
const node6 = new BinaryTreeNode(6)
const node7 = new BinaryTreeNode(7)

node4.left = node3;
node4.right = node6;
node3.left = node1
node3.right = node2
node6.left = node5
node6.right = node7

//           4
//         /   \
//        3     6
//       / \   / \
//      1   2 5   7

const binarySearchTreeRoot4 = new BinarySearchTree(node4)
const binarySearchTreeRoot6 = new BinarySearchTree(node6)
const binarySearchTreeRoot5 = new BinarySearchTree(node5)
const binarySearchTreeRoot7 = new BinarySearchTree(node7)

const isBstNode = (node) => {
  if (!node) return true
  const isLeftBst = isBstNode(node.left)
  const isRightBst = isBstNode(node.right)
  const isActualBst = node.value > (node.left?.value ?? Number.MIN_VALUE) && node.value < (node.right?.value ?? Number.MAX_VALUE);
  return isLeftBst && isRightBst && isActualBst
}

const isBst = (tree) => isBstNode(tree.root)


console.log('isBst(binarySearchTreeRoot4): ', isBst(binarySearchTreeRoot4)) // false
console.log('isBst(binarySearchTreeRoot6): ', isBst(binarySearchTreeRoot6)) // true
console.log('isBst(binarySearchTreeRoot5): ', isBst(binarySearchTreeRoot5)) // true
console.log('isBst(binarySearchTreeRoot7): ', isBst(binarySearchTreeRoot7)) // true




const node1a = new BinaryTreeNode(1)
const node2a = new BinaryTreeNode(2)
const node3a = new BinaryTreeNode(3)
const node4a = new BinaryTreeNode(4)
const node5a = new BinaryTreeNode(5)
const node6a = new BinaryTreeNode(6)
const node7a = new BinaryTreeNode(7)

node4a.left = node2a;
node4a.right = node6a;
node2a.left = node1a
node2a.right = node3a
node6a.left = node5a
node6a.right = node7a

//           4
//         /   \
//        2     6
//       / \   / \
//      1   3 5   7

const binarySearchTreeRoot4a = new BinarySearchTree(node4a)

console.log('isBst(binarySearchTreeRoot4a): ', isBst(binarySearchTreeRoot4a)) // true
