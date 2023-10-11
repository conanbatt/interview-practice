// 3. *Delete Middle Node*: Implement an algorithm to delete a node in the middle 
//(i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, 
// given only access to that node.

// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72

class LinkedNode {
  constructor(value) {
    this.value = value;
    this.next = null; // Initialize 'next' as null
  }
}

const a = new LinkedNode('a');
const b = new LinkedNode('b');
const c = new LinkedNode('c');
const d = new LinkedNode('d');
const e = new LinkedNode('e');

a.next = b;
b.next = c;
c.next = d;
d.next = e;

const deleteMiddleNode = (node, deleteNodeValue) => {
  if (node.value === deleteNodeValue) {
    return node.next;
  }

  let current = node;
  let nextNode = current.next;

  while (nextNode) {
    if (nextNode.value === deleteNodeValue) {
      current.next = nextNode.next;
      break;
    }
    current = nextNode;
    nextNode = current.next;
  }

  return node;
};

deleteMiddleNode(a, 'c');
