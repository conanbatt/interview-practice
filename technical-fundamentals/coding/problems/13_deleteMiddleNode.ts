// 3. *Delete Middle Node*:

// Implement an algorithm to delete a node in the middle
// (i.e., any node but the first and last node, not necessarily the exact middle)
// of a singly linked list, given only access to that node.

// ```
// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72
// ```

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function deleteMiddleNode<T>(
  head: Node<T>,
  position: number,
): Node<T> | undefined {

  if(position < 0) return head;

  const lList = new LinkedList<T>(head);
  lList.visit((node, index) => {
    if(index === position - 1 && node.next && node.next.next){
      node.next = node.next.next;
      return lList.head;
    }
    return null;
  });
  return head;
}

export function deleteMiddleNode2<T>(
  head: Node<T>,
  position: number,
): Node<T> | undefined {

  let p: Node<T> | undefined = head;
  let index = 0;
  if(position < 0) return head;

  while(p){
    if(index === position-1 && p.next && p.next.next) {
      p.next = p.next.next;
      return head;
    }
    index++;
    p = p.next;
  }

  return head;

}
