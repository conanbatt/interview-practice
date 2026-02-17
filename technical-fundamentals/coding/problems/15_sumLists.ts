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

export default function sumLists(
  list1: Node<number> | undefined,
  list2: Node<number> | undefined,
): Node<number> | undefined {

  let multiplier = 1;
  let result = 0;
  while(list1 || list2){
    let val1;
    let val2;
    if(!list1) {
      val1 = 0;
    } else {
      val1 = list1.value;
    }
    if(!list2) {
      val2 = 0;
    } else {
      val2 = list2.value;
    }

    result += (val1 + val2) * multiplier;
    multiplier *= 10;

    list1 = list1?.next;
    list2 = list2?.next;

  }
  let resultNode: Node<number> = {value: {} as number};
  const resHead = resultNode;
  while(result >= 1){
    const nextD = result % 10;
    result = Math.floor(result / 10);
    resultNode.next = {value: nextD};
    resultNode = resultNode.next;
  }

  return resHead.next;

}
