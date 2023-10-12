// 6.  Suppose the digits are stored in forward order.Repeat the above problem.

// ```
// EXAMPLE
// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295
// Output:9 -> 1 -> 2,Thatis,912.
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
    arr1.push(actualNode1.value)
    actualNode1 = actualNode1.next
  }

  let actualNode2 = list2
  while (actualNode2) {
    arr2.push(actualNode2.value)
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