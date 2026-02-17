// 5. *Sort Stack*:

// Write a program to sort a stack such that the smallest items are on the top.
// You can use an additional temporary stack, but you may not copy the elements
// into any other data structure (such as an array).
// The stack supports the following operations: push, pop, peek, and isEmpty.

export default class SortStack<T> {
    private stack: T[] = [];

    constructor() {
    }
    push(value: T): void {
        if(this.stack.length === 0 || value <= this.peek()){
            this.stack.push(value);
        } else {
            let pop: T | undefined = this.stack.pop();
            let aux: T[] = [];
            while(pop && pop < value){
                aux.push(pop);
                pop = this.stack.pop();
            }
            if(pop && pop > value) this.stack.push(pop);
            this.stack.push(value);
            this.getAllAux(aux);
        }
    }

    private getAllAux(aux: T[]): void{
        let pop;
        while(pop = aux.pop()){
            this.stack.push(pop);
        }
    }

    pop(): T | undefined {
        return this.stack.pop();
    }

    peek(): T {
        return this.stack[this.stack.length - 1];
    }

    isEmpty(): boolean {
        return this.stack.length === 0;
    }
}
