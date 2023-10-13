// 9. * Loop Detection *: Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.

// ```
// DEFINITION
// Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.
// ```

//   ```
// EXAMPLE
// Input: A->8->C->D->E-> C[thesameCasearlier] Output: C
// Hints: #50, #69, #83, #90
// ```

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
e.next = f;
const g = new LinkedNode('g');
f.next = g;
g.next = d;

const getBeginingOfLoop = (nodeA) => {
  const nodeSet = new Set()

  let actualNodeA = nodeA
  while(actualNodeA) {
    const hasIntersection = nodeSet.has(actualNodeA)
    if (hasIntersection) return actualNodeA
    nodeSet.add(actualNodeA)
    actualNodeA = actualNodeA.next
  }
}

getBeginingOfLoop(a)