// 4. *Partition*:

// Write code to partition a linked list around a value x,
// such that all nodes less than x come before all nodes greater than or equal to x.
// If x is contained within the list, the values of x only need to be after the elements
// less than x (see below). The partition element x can appear anywhere in the
// "right partition"; it does not need to appear between the left and right partitions.

// ```
// EXAMPLE
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1[partition=5]
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// ```

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function partition<T>(
  head: Node<T> | undefined,
  x: T,
): Node<T> | undefined {
  const list = new LinkedList(head);
  list.print();

  const l1 = list.filter((node) => node.value < x);
  const l2 = list.filter((node) => node.value >= x);

  l1.print();
  l2.print();

  l1.merge(l2);

  return l1.head;
}
