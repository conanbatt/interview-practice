// 1. *Remove Dups*:

// Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?
//
// 1 -> 2 -> 2-> 2 -> 4

import {LinkedList} from "./10_LinkedList";

export type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default function removeDups<T>(head?: Node<T>): Node<T> | undefined {
  // no extra structures, just pointers
  // from beginning to current position -> no dups
  // each one iterates from start and if it's repeated -> jump

  let p = head;
  outerWhile: while(p){
    let q = head; //q: from start to current
    while(q && (q !== p)){
      if(p.next && q.value === p.next.value){
        p.next = p.next.next;
        continue outerWhile;
      }
      q = q.next;
    }

    //initial case or repetition
    if(q === p && p.next &&  q.value === p.next.value){
      p.next = p.next.next;
      continue;
    }

    p = p.next;
  }

  return head;

}

export function removeDups2<T>(head?: Node<T>): Node<T> | undefined {

    const lList: LinkedList<T> = new LinkedList<T>(head);
    const mySet: Set<T> = new Set<T>();

    const ret: LinkedList<T> = lList.filter((node: Node<T>) => {
        if (mySet.has(node.value)) {
            return false;
        } else {
            mySet.add(node.value);
            return true;
        }
    });

    return ret.head;

}
