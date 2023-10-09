// 9. *BST Sequences*: A binary search tree was created by traversing through an array
// from left to right and inserting each element. Given a binary search tree with distinct elements,
// print all possible arrays that could have led to this tree.

//   a
//  / \
// c   d

// a
// c d

// [a, c, d]
// [a, d, c]
// [c, d, a]
// [c, a, d]
// [d ,c, a]
// [d, a, c]

  class Node {
    value;
    left;
    right;

    constructor(value) {
      this.value = value;
    }
  }

  const node1 = new Node(1);
  const node2 = new Node(2);
  const node3 = new Node(3);
  const node4 = new Node(4);
  const node5 = new Node(5);
  const node6 = new Node(6);
  const node7 = new Node(7);
  const node8 = new Node(8);
  const node9 = new Node(9);
  const node10 = new Node(10);
  const node11 = new Node(11);

  node8.left = node6
  node8.right = node10
  node6.left = node4
  node6.right = node7
  node10.left = node9
  node10.right = node11
  // node4.left = node2
  // node4.right = node5
  // node2.left = node1
  // node2.right = node3

  //          8
  //        /   \
  //       6     10
  //      / \   / \
  //     4   7 9   11




  function findAllPossibleArrays(root) {
    if (!root) return []
    if (!root.left && !root.right) return [[root.value]]

    const arrIzq = findAllPossibleArrays(root.left)
    const arrDer = findAllPossibleArrays(root.right)

    const actualMatrix = [                         // 8
      ...arrIzq.flatMap(item => arrDer.map(der => [root.value, ...item, ...der])),
      ...arrDer.flatMap(item => arrIzq.map(der => [root.value, ...item, ...der]))
    ]

    return actualMatrix
  }

  console.log('findAllPossibleArrays(node8): ', findAllPossibleArrays(node8))
  