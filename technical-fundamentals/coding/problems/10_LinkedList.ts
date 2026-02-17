// 10. *Implement a Linked List*;

// Create the data structure with the corresponding initial functions:

export type Node<T> = {
    next?: Node<T> | undefined;
    value: T;
};

export class LinkedList<T> {
    head: Node<T> | undefined;
    tail: Node<T> | undefined;

    constructor(head?: Node<T>) {
        this.head = head;
        this.tail = head;
    }

    push(value: T) {
        let newNode: Node<T> = {value: value};
        if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = this.head;
        }
    }

    filter(fn: (node: Node<T>) => boolean): LinkedList<T> {
        const result = new LinkedList<T>();
        if (!this.head) return this;
        let p: Node<T> | undefined = this.head;
        while (p) {
            if (fn(p)) {
                result.push(p.value);
            }
            p = p.next;
        }

        return result;
    }

    visit(fn: (node: Node<T>, index: number) => void) {
        let index = 0;
        let p = this.head;
        while(p){
            fn(p, index);
            index++;
            p = p.next;
        }
    }

    remove() {
    }

    merge(list: LinkedList<T>): LinkedList<T> {
        if(!this.tail) return list;
        this.tail.next = list.head;
        this.tail = list.tail;
        return this;
    }

    print() {
    }

    // extra

    //find(): Node<T> {}
    //get(index: number): Node<T> {}
    //iterator(): LinkedListIterator {}

    length(): number {
        let length = 0;
        this.visit(() => {
            length++;
        });
        return length;
    }
}

const list = new LinkedList();
