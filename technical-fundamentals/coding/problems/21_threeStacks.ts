// 1. *Three in One*: Describe how you could use a single array to implement three stacks.

//this approach is different, but it has same complexity than other solution... so I keep it
export default class ThreeStacks<T> {
    private array: Array<T | undefined>;
    private index0 = 0;
    private index1 = 1;
    private index2 = 2;

    constructor(arrayLength: number) {
        this.array = new Array(arrayLength).fill(null);
    }

    push(stackNum: number, value: T): void {
        if(stackNum % 3 === 0){
            this.array[this.index0] = value;
            this.index0 += 3;
        } else if(stackNum % 3 === 1){
            this.array[this.index1] = value;
            this.index1 += 3;
        } else if(stackNum % 3 === 2){
            this.array[this.index2] = value;
            this.index2 += 3;
        }
    }

    pop(stackNum: number): T | undefined {
        let value: T | undefined;
        if(stackNum % 3 === 0){
            value = this.array[this.index0 - 3];
            this.array[this.index0 - 3] = undefined; //to keep consistency. Should not be necessary
            this.index0 -= 3;
        } else if(stackNum % 3 === 1){
            value = this.array[this.index1 - 3];
            this.array[this.index1 - 3] = undefined;
            this.index1 -= 3;
        } else if(stackNum % 3 === 2){
            value = this.array[this.index2 - 3];
            this.array[this.index2 - 3] = undefined;
            this.index2 -= 3;
        } else {
            return undefined;
        }
        return value;
    }

    peek(stackNum: number): T | undefined {
        let value: T | undefined;
        if(stackNum % 3 === 0){
            value = this.array[this.index0 - 3];
        } else if(stackNum % 3 === 1){
            value = this.array[this.index1 - 3];
        } else if(stackNum % 3 === 2){
            value = this.array[this.index2 - 3];
        } else {
            return undefined;
        }
        return value;
    }
}