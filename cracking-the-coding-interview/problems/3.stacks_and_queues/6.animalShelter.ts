// 6. * Animal Shelter *: An animal shelter, which holds only dogs and cats, operates on a strictly
// "first in, first out" basis.People must adopt either the "oldest"(based on arrival time) of all animals at the shelter,
// or they can select whether they would prefer a dog or a cat(and will receive the oldest animal of that type)
// They cannot select which specific animal they would like. 
// Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog,
// and dequeueCat.You may use the built -in LinkedList data structure.

class AnimalShelter {
  fifo;
  dog;
  cat;

  constructor() {
    this.fifo = [];
    this.dog = [];
    this.cat = [];
  }

  enqueue(animal, type) {
    this.fifo.push({ animal, type });
    if (type === 'dog') {
      this.dog.push({ animal, type });
    } else if (type === 'cat') {
      this.cat.push({ animal, type });
    }
  }

  dequeueAny() {
    if (this.fifo.length === 0) {
      return undefined; // No animals in the shelter.
    }
    const oldest = this.fifo.shift();
    if (oldest.type === 'dog') {
      this.dog.shift();
    } else if (oldest.type === 'cat') {
      this.cat.shift();
    }
    return oldest.animal;
  }

  dequeueDog() {
    if (this.dog.length === 0) {
      return undefined; // No dogs in the shelter.
    }
    const oldestDog = this.dog.shift();
    this.removeAnimalFromFifo(oldestDog);
    return oldestDog.animal;
  }

  dequeueCat() {
    if (this.cat.length === 0) {
      return undefined; // No cats in the shelter.
    }
    const oldestCat = this.cat.shift();
    this.removeAnimalFromFifo(oldestCat);
    return oldestCat.animal;
  }

  removeAnimalFromFifo(animal) {
    this.fifo = this.fifo.filter(entry => entry !== animal);
  }
}

const shelter = new AnimalShelter();

shelter.enqueue('Dog 1', 'dog');
shelter.enqueue('Cat 1', 'cat');
shelter.enqueue('Dog 2', 'dog');
shelter.enqueue('Cat 2', 'cat');

console.log(shelter.dequeueAny()); // Outputs: Dog 1
console.log(shelter.dequeueDog()); // Outputs: Dog 2
console.log(shelter.dequeueCat()); // Outputs: Cat 1
