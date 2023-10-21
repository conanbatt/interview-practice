// 2.  *Return Kth to Last*: Implement an algorithm to find the kth to last element of a singly linked list.


class LinkedNode {
  value
  next

  constructor(value){
    this.value = value;
  }
}

const a = new LinkedNode('a');
const b = new LinkedNode('b');
const c = new LinkedNode('b');
const d = new LinkedNode('d');
const e = new LinkedNode('e');

a.next = b
b.next = c
c.next = d
d.next = e


const getKthToLast = (node, k) => {
  let i = 0;
  let actualNode = node
  let pointer = node
  while (i < k){
    actualNode = actualNode.next
    i++;
  }

  while (actualNode.next) {
    pointer = pointer.next;
    actualNode = actualNode.next;
  }

  return pointer; 
}


console.log(getKthToLast(a, 1).value);

getKthToLast(a,1)