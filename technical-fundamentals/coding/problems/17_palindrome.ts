// 7. *Palindrome*:

// Implement a function to check if a linked list is a palindrome.

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function isPalindrome<T>(head: Node<T> | undefined): boolean {
  let str1 = "";
  let str2 = "";
  if(!head) return false;
  const lList = new LinkedList(head);
  lList.visit((n) => {
    str1 += n.value;
    str2 = n.value + str2;
  });
  return str1 === str2;
}
