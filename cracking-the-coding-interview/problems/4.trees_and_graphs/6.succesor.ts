// 6. *Successor*: Write an algorithm to find the "next" node (i.e., in-order successor) of a given node
// in a binary search tree. You may assume that each node has a link to its parent.

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function inOrderSuccessor(node) {
  if (node === null) return null;

  if (node.right) {
    return findMin(node.right);
  }

  let parent = node.parent;
  while (parent !== null && parent.right === node) {
    node = parent;
    parent = parent.parent;
  }

  return parent;
}

function findMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}


//        10
//       /  \
//      5   15
//     / \
//    3   7

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.left.parent = root;
root.right = new TreeNode(15);
root.right.parent = root;
root.left.left = new TreeNode(3);
root.left.left.parent = root.left;
root.left.right = new TreeNode(7);
root.left.right.parent = root.left;

const nodeToFind = root.left;
const successor = inOrderSuccessor(nodeToFind);

if (successor) {
  console.log(`The in-order successor of ${nodeToFind.value} is ${successor.value}`);
}

const nodeToFind2 = root.left.left;
const successor2 = inOrderSuccessor(nodeToFind2);

if (successor2) {
  console.log(`The in-order successor of ${nodeToFind2.value} is ${successor2.value}`);
}

const nodeToFind3 = root.left.right;
const successor3 = inOrderSuccessor(nodeToFind3);

if (successor3) {
  console.log(`The in-order successor of ${nodeToFind3.value} is ${successor3.value}`);
}