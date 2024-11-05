import AnimalShelter from "../../26_animalShelter";

describe("AnimalShelter", () => {
  test("enqueue and dequeue elements from queue", () => {
    const shelter = new AnimalShelter();

    // Enqueue some animals
    shelter.enqueue("dog");
    shelter.enqueue("cat");
    shelter.enqueue("dog");

    // Dequeue any animal
    expect(shelter.dequeueAny()?.type).toBe("dog"); // Oldest animal is a dog
    expect(shelter.dequeueAny()?.type).toBe("cat"); // Oldest animal is a cat

    // Enqueue more animals
    shelter.enqueue("cat");
    shelter.enqueue("dog");

    // Dequeue a dog
    expect(shelter.dequeueDog()?.type).toBe("dog"); // Oldest dog

    // Enqueue another dog
    shelter.enqueue("dog");

    // Dequeue a cat
    expect(shelter.dequeueCat()?.type).toBe("cat"); // Oldest cat
  });

  test("dequeue methods return undefined when shelter is empty", () => {
    const shelter = new AnimalShelter();

    expect(shelter.dequeueAny()).toBeUndefined();
    expect(shelter.dequeueDog()).toBeUndefined();
    expect(shelter.dequeueCat()).toBeUndefined();
  });
});
