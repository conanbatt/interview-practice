// 2. *Stack Min*: How would you design a stack which,
// in addition to push and pop,
// has a function min which returns the minimum element?
// Push, pop, and min should all operate in O(1) time.
//

export default class StackMin<T> {
    private array: T[];
    private minArray: T[];

    constructor() {
        this.array = [];
        this.minArray = []; //it has always the min value at some point
    }

    push(value: T): void {
        this.array.push(value);
        if(this.minArray.length === 0 || value <= this.peek()){
            this.minArray.push(value);
        }
    }

    private peek() {
        return this.minArray[this.minArray.length - 1];
    }

    pop(): T | undefined {
        const result = this.array.pop();
        if(this.peek() === result){
            this.minArray.pop();
        }
        return result;
    }

    min(): T | undefined {
        return this.peek();
    }
}
