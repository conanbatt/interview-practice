// 4. *Queue via Stacks*:

// Implement a MyQueue class which implements a queue using two stacks.

export default class MyQueue<T> {
    private orderedStack: T[] = [];
    private queueStack: T[] = [];

    constructor() {
    }

    enqueue(value: T): void {
        this.orderedStack.push(value);
    }

    dequeue(): T | undefined {
        if(this.queueStack.length > 0){
            return this.queueStack.pop();
        } else {
            if(this.orderedStack.length === 0) return undefined;
            while(this.orderedStack.length > 0){
                this.queueStack.push(this.orderedStack.pop()!);
            }
            return this.queueStack.pop();
        }
    }

    peek(): T | undefined {
        if(this.queueStack.length > 0){
            return this.queueStack[this.queueStack.length - 1];
        } else {
            if(this.orderedStack.length === 0) return undefined;
            while(this.orderedStack.length > 0){
                this.queueStack.push(this.orderedStack.pop()!);
            }
            return this.queueStack[this.queueStack.length - 1];
        }
    }

    isEmpty(): boolean {
        return this.queueStack.length === 0 && this.orderedStack.length === 0;
    }
}
