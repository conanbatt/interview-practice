// 7. *Palindrome*: Implement a function to check if a linked list is a palindrome.
// with no extra structure

class LinkedNode {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new LinkedNode('a');
const b = new LinkedNode('b');
const c = new LinkedNode('c');
const x = new LinkedNode('x');
const d = new LinkedNode('1');
const e = new LinkedNode('2');
const f = new LinkedNode('3');

a.next = b;
b.next = c;
c.next = x;
x.next = d;
d.next = e;
e.next = f;

const a1 = new LinkedNode('a');
const b1 = new LinkedNode('b');
const c1 = new LinkedNode('c');
const x1 = new LinkedNode('x');
const d1 = new LinkedNode('c');
const e1 = new LinkedNode('b');
const f1 = new LinkedNode('a');

a1.next = b1;
b1.next = c1;
c1.next = x1;
x1.next = d1;
d1.next = e1;
e1.next = f1;

const a2 = new LinkedNode('a');
const b2 = new LinkedNode('b');
const c2 = new LinkedNode('c');
const d2 = new LinkedNode('c');
const e2 = new LinkedNode('b');
const f2 = new LinkedNode('a');

a2.next = b2;
b2.next = c2;
c2.next = d2;
d2.next = e2;
e2.next = f2;

const checkPalindrome = (node) => {
  if (!node || !node.next) return true;

  let slow = node
  let fast = node?.next
  while (fast) {
    slow = slow.next
    fast = fast.next?.next
  }

  let current = slow
  let prev = null;
  while (current) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  let firstHalf = node;
  let secondHalf = prev;
  while (secondHalf) {
    if (firstHalf.value !== secondHalf.value) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  return true;
}

console.log('check a: ',checkPalindrome(a))
console.log('----------------------------------------------------------------')
console.log('check a1: ',checkPalindrome(a1))
console.log('----------------------------------------------------------------')
console.log('check a2: ',checkPalindrome(a2))