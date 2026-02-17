// 6. *Animal Shelter*:

// An animal shelter, which holds only dogs and cats, operates on a strictly
// "first in, first out" basis. People must adopt either the "oldest"
// (based on arrival time) of all animals at the shelter,
// or they can select whether they would prefer a dog or a cat
// (and will receive the oldest animal of that type).
// They cannot select which specific animal they would like.
// Create the data structures to maintain this system and implement operations
// such as enqueue, dequeueAny, dequeueDog, and dequeueCat.
// You may use the built-in LinkedList data structure.

import './10_LinkedList'
import {LinkedList} from "./10_LinkedList";

export type AnimalType = "dog" | "cat";

export class Animal {
  type: AnimalType;
  constructor(type: AnimalType) {
    this.type = type;
  }
}

export default class AnimalShelter {

    private list = new LinkedList<Animal>();

    constructor() {
    }

    enqueue(type: AnimalType): void {
        this.list.push(new Animal(type));
    }

    dequeueAny(): Animal | undefined {
        if(!this.list.head) return undefined;
        let ret = this.list.head?.value;
        this.list.head = this.list.head.next;
        if(!this.list.head) this.list.tail = undefined;
        return ret;
    }

    dequeueDog(): Animal | undefined {
        return this.dequeueByParam("dog");
    }

    dequeueCat(): Animal | undefined {
        return this.dequeueByParam("cat");
    }

    private dequeueByParam(animal: AnimalType) {
        let p = this.list.head;
        if (!p) return p;
        if (p?.value.type === animal) {
            return this.dequeueAny();
        } else {
            while (p && p.next && p.next.value.type !== animal) {
                p = p.next;
            }
            if (p.next && p.next.value.type === animal) {
                let ret = p.next.value;
                p.next = p.next.next;
                return ret;
            }
        }
        return undefined;
    }
}

