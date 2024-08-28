// 7. *Palindrome*:

// Implement a function to check if a linked list is a palindrome.

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function isPalindrome<T>(head: Node<T> | undefined): boolean {
  let l = new LinkedList(head);
  let l2 = l.reverse();
  let c: Node<T> | undefined, c2: Node<T> | undefined;
  c = l.head;
  c2 = l2.head;

  while (c && c2) {
    if (c.value !== c2.value) return false;
    c = c.next;
    c2 = c2.next;
  }

  return true;
}
