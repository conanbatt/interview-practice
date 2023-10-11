// 5. * Sum Lists *: You have two numbers represented by a linked list, where each node contains a single digit.
// The digits are stored in reverse order, such that the Vs digit is at the head of the list.Write a function that 
// adds the two numbers and returns the sum as a linked list.

// ```
// EXAMPLE
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.
// ```

class LinkedNode {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null; // Initialize 'next' as null
  }
}

const a = new LinkedNode(3);
const b = new LinkedNode(1);
const c = new LinkedNode(3);
const d = new LinkedNode(4);
const e = new LinkedNode(4);
const f = new LinkedNode(2);

a.next = b;
b.next = c;

d.next = e;
e.next = f;

const sumLists = (list1, list2) => {
  let arr1 = []
  let arr2 = []
  
  let actualNode1 = list1
  while (actualNode1) {
    arr1.unshift(actualNode1.value)
    actualNode1 = actualNode1.next
  }

  let actualNode2 = list2
  while (actualNode2) {
    arr2.unshift(actualNode2.value)
    actualNode2 = actualNode2.next
  }
  const sum1 = parseInt(arr1.join(''))
  const sum2 = parseInt(arr2.join(''))
  const result = sum1 + sum2

  const nodeStart = new LinkedNode()
  let node = nodeStart
  result.toString().split('').forEach((num, i) => {
    if(i > 0){
      node.next = new LinkedNode()
      node = node.next
    }
    node.value = num;
  })
  return nodeStart
}

sumLists(a, d)