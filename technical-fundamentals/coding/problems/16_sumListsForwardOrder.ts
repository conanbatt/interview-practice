// 6.  Suppose the digits are stored in forward order. Repeat the above problem.

// ```
// EXAMPLE
// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295
// Output:9 -> 1 -> 2,Thatis,912.
// ```

import { LinkedList } from "./10_LinkedList";

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function sumListsForwardOrder(
  list1: Node<number> | undefined,
  list2: Node<number> | undefined,
): Node<number> | undefined {
  let result: number = getNumber(list1) + getNumber(list2);
  if(result === 0) return undefined;
  let resList: Node<number> = {value: {} as number}
  const resHead = resList;
  const str = String(result);
  for(let i = 0; i < str.length; i++){
    resList.next = {value: Number(str[i])}
    resList = resList.next;
  }
  return resHead.next;
}

function getNumber(list : Node<number> | undefined): number{
  if(!list) return 0;
  const lList = new LinkedList(list);
  let str = "";
  lList.visit((n: Node<number>) => {
    str += n.value;
  });
  return Number(str);
}
