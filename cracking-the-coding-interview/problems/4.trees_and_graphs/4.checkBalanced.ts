// 4. *Check Balanced*: Implement a function to check if a binary tree is balanced. For the purposes of this question,
// a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.

class BinaryNode {
  value;
  left;
  right;
  constructor(value, left, right){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  root
  constructor(root) {
    this.root = root;
  }
}

const rootNode = new BinaryNode(1)
const aNode = new BinaryNode(2)
const bNode = new BinaryNode(3)
const cNode = new BinaryNode(4)
const dNode = new BinaryNode(5)
const eNode = new BinaryNode(6)
const fNode = new BinaryNode(7)
const gNode = new BinaryNode(8)
const hNode = new BinaryNode(9)

rootNode.left = aNode
rootNode.right = bNode
aNode.left = cNode
aNode.right = dNode
bNode.left = eNode
bNode.right = fNode
cNode.left = gNode
cNode.right = hNode

//           1
//         /   \
//        2     3
//       / \   / \
//      4   5 6   7
//     / \
//    8   9

const balancedTree = new BinaryTree(rootNode)

const rootNode1 = new BinaryNode(1)
const a2Node = new BinaryNode(2)
const b3Node = new BinaryNode(3)
const c4Node = new BinaryNode(4)
const d5Node = new BinaryNode(5)
const e6Node = new BinaryNode(6)
const f7Node = new BinaryNode(7)
const g8Node = new BinaryNode(8)
const h9Node = new BinaryNode(9)


rootNode1.left = a2Node
rootNode1.right = b3Node
a2Node.left = c4Node
a2Node.right = d5Node
b3Node.left = e6Node
b3Node.right = f7Node
c4Node.left = g8Node
g8Node.left = h9Node


const imbalancedTree = new BinaryTree(rootNode1)

//           1
//         /   \
//        2     3
//       / \   / \
//      4   5 6   7
//     /
//    8  
//   /
//  9


const getHeight = (node, height = 0) => {
  if (!node) return [height, true]
  const [leftHeight, isLeftBalanced] = getHeight(node.left, height + 1)
  const [rightHeight, isRightBalanced] = getHeight(node.right, height + 1)
  const maxHeight = Math.max(leftHeight, rightHeight)
  const isBalanced = Math.abs(leftHeight - rightHeight) < 2
  return [maxHeight, isLeftBalanced && isRightBalanced && isBalanced]
} 

const isBalancedTree = (tree) => getHeight(tree.root, 0)[1]

console.log('balancedTree', isBalancedTree(balancedTree))
console.log('imbalancedTree', isBalancedTree(imbalancedTree))