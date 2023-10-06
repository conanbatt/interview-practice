// 8. * First Common Ancestor *: Design an algorithm and write code to find the first common ancestor of two nodes 
// in a binary tree. Avoid storing additional nodes in a data structure.
// NOTE: This is not necessarily a binary search tree.

(function () {
  class NodeWithMark {
    value;
    marked;
    left;
    right;

    constructor(value) {
      this.value = value;
      this.marked = false;
    }
  }

  const nodeA = new NodeWithMark('a');
  const nodeB = new NodeWithMark('b');
  const nodeC = new NodeWithMark('c');
  const nodeD = new NodeWithMark('d');
  const nodeE = new NodeWithMark('e');
  const nodeF = new NodeWithMark('f');
  const nodeG = new NodeWithMark('g');
  const nodeH = new NodeWithMark('h');
  const nodeI = new NodeWithMark('i');
  const nodeJ = new NodeWithMark('j');
  const nodeK = new NodeWithMark('k');
  const nodeL = new NodeWithMark('l');
  const nodeM = new NodeWithMark('m');
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