// 8.  *Intersection*;

// Given two (singly) linked lists, determine if the two lists intersect.
// Return the inter- secting node. Note that the intersection is defined
// based on reference, not value. That is, if the kth node of the first linked list
// is the exact same node (by reference) as the j t h node of the second linked list,
// then they are intersecting.
// Return the first intersecting node. Note that the intersection is defined
// based on reference, not value.

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function intersection<T>(list1: Node<T> | undefined, list2: Node<T> | undefined): Node<T> | null {
  
}