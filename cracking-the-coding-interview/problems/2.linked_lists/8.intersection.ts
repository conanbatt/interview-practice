// 8.  *Intersection*; Given two (singly) linked lists, determine if the two lists intersect.
// Return the inter- secting node. Note that the intersection is defined based on reference, not value.
// That is, if the kth node of the first linked list is the exact same node (by reference) 
// as the j t h node of the second linked list, then they are intersecting.


class LinkedNode {
  value;
  next;
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
const f = new LinkedNode('f');


a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;

const g = new LinkedNode('g');
g.next = d;

const hasCycle = (head) => {
  const visitedNodes = new Set();

  let currentNode = head;
  while (currentNode) {
    if (visitedNodes.has(currentNode)) {
      return true;
    }
    visitedNodes.add(currentNode);
    currentNode = currentNode.next;
  }

  return false;
};

const getIntersection = (nodeA, nodeB) => {
  if (hasCycle(nodeA) || hasCycle(nodeB)) {
    console.error('Cycle detected in one of the lists');
    return null;
  }
  const nodeSet = new Set()

  let actualNodeA = nodeA
  while(actualNodeA) {
    nodeSet.add(actualNodeA)
    actualNodeA = actualNodeA.next
  }

  let actualNodeB = nodeB
  while (actualNodeB) {
    const hasIntersection = nodeSet.has(actualNodeB)
    if(hasIntersection) return actualNodeB
    actualNodeB = actualNodeB.next
  }
}

getIntersection(a, g)