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

  const lList = new LinkedList<T>(head);
  const front = lList.filter((n) => {
    return n.value < x;
  });
  const back = lList.filter((n) => {
    return n.value >= x;
  });

  return front.merge(back).head;
}

//I made this without filter() and merge()
export function partition2<T>(
  head: Node<T> | undefined,
  x: T,
): Node<T> | undefined {

  if(!head) return head;

  let p = head;
  let auxList: Node<T> = {value: {} as T};
  const auxHead = auxList;
  let firstHead: Node<T> | undefined = head;

  while(firstHead && firstHead.value < x){
    auxList.next = firstHead;
    auxList = auxList.next;
    firstHead = firstHead.next;
  }

  const lList = new LinkedList(firstHead);

  lList.visit((n) => {
    if(n.next && n.next.value < x) {
      auxList.next = n.next;
      n.next = n.next.next;
      auxList = auxList.next;
      if(n.next && !n.next.next && n.next.value < x){
        auxList.next = n.next;
        auxList = auxList.next;
        n.next = undefined;
      }
    }
  });

  auxList.next = firstHead;
  return auxHead.next;

}

