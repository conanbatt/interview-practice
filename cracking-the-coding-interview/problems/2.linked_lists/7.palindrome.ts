// 7. *Palindrome*: Implement a function to check if a linked list is a palindrome.


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
const d = new LinkedNode('c');
const e = new LinkedNode('b');
const f = new LinkedNode('a');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;

const checkPalindrome = (node) => {
  const arr = []

  let actualNode = node
  while(actualNode) {
    arr.push(actualNode.value)
    actualNode = actualNode.next
  }

  const arrjoined = arr.join('')

  return arr.reverse().join('') === arrjoined
}

checkPalindrome(a)