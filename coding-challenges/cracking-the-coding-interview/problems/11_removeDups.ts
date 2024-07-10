// 1. *Remove Dups*:

// Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?

export type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default function removeDups<T>(head?: Node<T>): Node<T> | undefined {
    if (head === undefined) return undefined;
}