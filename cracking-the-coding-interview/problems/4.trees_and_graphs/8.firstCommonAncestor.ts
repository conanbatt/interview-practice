// 8. * First Common Ancestor *: Design an algorithm and write code to find the first common ancestor of two nodes 
// in a binary tree. Avoid storing additional nodes in a data structure.
// NOTE: This is not necessarily a binary search tree.

(function () {
  class Node {
    value;
    left;
    right;

    constructor(value) {
      this.value = value;
    }
  }

  const nodeA = new Node('a');
  const nodeB = new Node('b');
  const nodeC = new Node('c');
  const nodeD = new Node('d');
  const nodeE = new Node('e');
  const nodeF = new Node('f');
  const nodeG = new Node('g');
  const nodeH = new Node('h');
  const nodeI = new Node('i');
  const nodeJ = new Node('j');
  const nodeK = new Node('k');
  const nodeL = new Node('l');
  const nodeM = new Node('m');
  nodeA.left = nodeB
  nodeA.right = nodeC
  nodeB.left = nodeD
  nodeB.right = nodeE
  nodeC.left = nodeF
  nodeC.right = nodeG
  nodeD.left = nodeH
  nodeD.right = nodeI
  nodeH.left = nodeJ
  nodeH.right = nodeK
  nodeK.left = nodeL
  nodeK.right = nodeM

  //          a
  //        /   \
  //       b     c
  //      / \   / \
  //     d   e f   g
  //    / \
  //   h   i
  //  / \
  // j   k
  //    / \
  //   l   m


  function findCommonAncestor(root, node1, node2) {
    if (!root) {
      return null;
    }

    if (root === node1 || root === node2) {
      return root;
    }

    const leftResult = findCommonAncestor(root.left, node1, node2);
    const rightResult = findCommonAncestor(root.right, node1, node2);

    if (leftResult && rightResult) {
      return root;
    }

    return leftResult || rightResult;
  }

  const commonAncestor = findCommonAncestor(nodeA, nodeJ, nodeL);
  console.log(commonAncestor.value);
  const commonAncestorJG = findCommonAncestor(nodeA, nodeJ, nodeG);
  console.log(commonAncestorJG.value);


  // const hasChildren = (nodeChild, nodeToFind) => {
  //   if (!nodeChild) return  false;
  //   if (nodeChild.value === nodeToFind.value) return true;
  //   const hasChildrenLeft = hasChildren(nodeChild.left, nodeToFind)
  //   const hasChildrenRight = hasChildren(nodeChild.right, nodeToFind)
  //   return hasChildrenLeft || hasChildrenRight
  // }

})()