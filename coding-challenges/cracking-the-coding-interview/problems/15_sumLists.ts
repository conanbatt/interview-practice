// 5. *Sum Lists*: You have two numbers represented by a linked list,
// where each node contains a single digit. The digits are stored in reverse order,
// such that the Vs digit is at the head of the list.
// Write a function that adds the two numbers and returns the sum as a linked list.

// ```
// EXAMPLE
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.
// ```

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};
// 999 + 1 = 1000
// 9 + 1 + 0 = 10, carry = (9 + 1) / 10 = 1
// 9 + 0 + 1 = 10, carry
export default function sumLists(
  list1: Node<number> | undefined,
  list2: Node<number> | undefined,
): Node<number> | undefined {
  let c1 = list1;
  let c2 = list2;

  let res = new LinkedList<number>();
  let carryover = 0;

  while (c1 || c2) {
    res.push(((c1?.value || 0) + (c2?.value || 0) + carryover) % 10);
    carryover = Math.trunc(
      ((c1?.value || 0) + (c2?.value || 0) + carryover) / 10,
    );

    c1 = c1 ? c1.next : undefined;
    c2 = c2 ? c2.next : undefined;
  }

  if (carryover > 0) {
    res.push(carryover);
  }

  return res.head;
}
