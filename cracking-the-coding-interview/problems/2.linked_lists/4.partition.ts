// 4. * Partition *: Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x.Ifxis contained within the list, the values of x only need to be after the elements less than x(see below).The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.

// ```
// EXAMPLE
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1[partition=5]
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8


class LinkedNode {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null; // Initialize 'next' as null
  }
}

const a30 = new LinkedNode(30);
const b11 = new LinkedNode(11);
const c3 = new LinkedNode(3);
const d4 = new LinkedNode(4);
const e42 = new LinkedNode(42);
const f21 = new LinkedNode(21);

a30.next = b11;
b11.next = c3;
c3.next = d4;
d4.next = e42;
e42.next = f21;

const partitionLinkedList = (list, num) => {
  let beforeActual;
  let beforeRoot; 
  let afterActual;
  let afterRoot; 

  let actualNode = list
  while (actualNode) {
    const actualNodeValue = actualNode.value 
    const newNode = new LinkedNode(actualNodeValue)
    if (actualNodeValue < num) {
      if (!beforeActual){
        beforeActual = newNode
        beforeRoot = newNode
      } else {
        beforeActual.next = newNode
        beforeActual = beforeActual.next
      }
    } else if (actualNodeValue === num) {
      if (!afterActual) {
        afterActual = newNode
        afterRoot = newNode
      } else {
        newNode.next = afterRoot
        afterRoot = newNode
      }
    } else {
      if (!afterActual) {
        afterActual = newNode
        afterRoot = newNode
      } else {
        afterActual.next = newNode
        afterActual = afterActual.next
      }
    }
    actualNode = actualNode.next
  }

  beforeActual.next = afterRoot

  return beforeRoot

}

partitionLinkedList(a30, 4)