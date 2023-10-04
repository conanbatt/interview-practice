// 3. * List of Depths *: Given a binary tree, design an algorithm which creates a linked list
// of all the nodes at each depth(e.g., if you have a tree with depth D, you'll have D linked lists).

class LinkedListNode {
  data;
  next
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head;
  size;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new LinkedListNode(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.size++;
  }

  // Remove the first occurrence of a specified element
  remove(data) {
    let current = this.head;
    let previous = null;

    while (current !== null) {
      if (current.data === data) {
        if (previous === null) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        this.size--;
        return current.data;
      }

      previous = current;
      current = current.next;
    }

    return null;
  }

  getSize() {
    return this.size;
  }
}

class BstNode {
  value;
  left;
  right;
  constructor(value, left, right){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BstTree {
  root
  constructor(root) {
    this.root = root;
  }
}

const rootNode = new BstNode(1)
const aNode = new BstNode(2)
const bNode = new BstNode(3)
const cNode = new BstNode(4)
const dNode = new BstNode(5)
const eNode = new BstNode(6)
const fNode = new BstNode(7)
const gNode = new BstNode(8)
const hNode = new BstNode(9)

rootNode.left = aNode
rootNode.right = bNode
aNode.left = cNode
aNode.right = dNode
bNode.left = eNode
bNode.right = fNode
cNode.left = gNode
cNode.right = hNode

const bstTree = new BstTree(rootNode)


const arrayOfLists = [new LinkedList()];
const getListOfDepths = (node, depth = 0) => {
  if (node.value) {
    if (!arrayOfLists[depth]) arrayOfLists[depth] = new LinkedList()
    arrayOfLists[depth].add(node.value)
  }
  if (node.left) getListOfDepths(node.left, depth + 1) 
  if (node.right) getListOfDepths(node.right, depth + 1)
  return arrayOfLists;
}

getListOfDepths(bstTree.root)
console.log('arrayOfLists', arrayOfLists)

//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7
//  / \
// 8   9


// list 1
// [
//   {
//     "head": {
//       "data": 1,
//       "next": null
//     },
//     "size": 1
//   },

// list 2
//   {
//     "head": {
//       "data": 2,
//       "next": {
//         "data": 3,
//         "next": null
//       }
//     },
//     "size": 2
//   },

// list 3
//   {
//     "head": {
//       "data": 4,
//       "next": {
//         "data": 5,
//         "next": {
//           "data": 6,
//           "next": {
//             "data": 7,
//             "next": null
//           }
//         }
//       }
//     },
//     "size": 4
//   },

// list 4
//   {
//     "head": {
//       "data": 8,
//       "next": {
//         "data": 9,
//         "next": null
//       }
//     },
//     "size": 2
//   }
// ]