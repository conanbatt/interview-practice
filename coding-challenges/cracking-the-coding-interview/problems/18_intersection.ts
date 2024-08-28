// 8.  *Intersection*;

// Given two (singly) linked lists, determine if the two lists intersect.
// Return the first intersecting node. Note that the intersection is defined
// based on reference, not value.

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function intersection<T>(
  list1: Node<T> | undefined,
  list2: Node<T> | undefined,
): Node<T> | undefined {
  let s = new Set();

  let l1 = new LinkedList(list1);
  let l2 = new LinkedList(list2);
  let r: Node<T> | undefined = undefined;

  l1.visit((n) => s.add(n));
  l2.visit((n) => {
    if (s.has(n) && !r) r = n;
  });

  return r;
}
