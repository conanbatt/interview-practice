// 2.  *Return Kth to Last*:

// Implement an algorithm to find the kth to last element of a singly linked list.

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};
export default function kthToLast<T>(
  head: Node<T> | undefined,
  k: number,
): Node<T> | undefined {
  let lList: LinkedList<T> = new LinkedList<T>(head);
  const length = lList.length();
  let ret;
  lList.visit((node, index) => {
    if(index === length - k){
      ret = node;
    }
  });
  return ret;
}

//this is O(n) but uses an array as helper
export function kthToLast2<T>(
  head: Node<T> | undefined,
  k: number,
): Node<T> | undefined {
  const array = [];
  let p = head;
  let counter = 0;
  while(p){
    array[counter] = p;
    counter++;
    p = p.next;
  }
  return array[counter-k];
}
