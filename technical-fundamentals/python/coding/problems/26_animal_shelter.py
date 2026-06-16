# 26. Animal Shelter:
# An animal shelter, which holds only dogs and cats, operates on a strictly
# "first in, first out" basis. People must adopt either the "oldest" (based on
# arrival time) of all animals at the shelter, or they can select whether they
# would prefer a dog or a cat (and will receive the oldest animal of that type).
# They cannot select which specific animal they would like.
# Create the data structures to maintain this system and implement operations
# such as enqueue, dequeue_any, dequeue_dog, and dequeue_cat.

from typing import Literal, Optional

AnimalType = Literal["dog", "cat"]


class Animal:
    def __init__(self, animal_type: AnimalType):
        self.type = animal_type


class AnimalShelter:
    def __init__(self):
        self.stack = []
        self.total = 0
        self.dogs = []
        self.cats = []

    def enqueue(self, animal_type: AnimalType) -> None:
        animal = Animal(animal_type)
        self.stack.append(animal)
        if animal_type == "dog":
            self.dogs.append(self.total)
        else:
            self.cats.append(self.total)
        self.total += 1

    def dequeue_any(self) -> Optional[Animal]:
        if not self.stack:
            return None

        animal = self.stack.pop(0)
        if animal.type == "dog":
            self.dogs.pop(0)
        else:
            self.cats.pop(0)
        self.total -= 1
        return animal

    def dequeue_dog(self) -> Optional[Animal]:
        if not self.dogs:
            return None

        index = self.dogs.pop(0)
        animal = self.stack.pop(index)
        self.total -= 1
        return animal


    def dequeue_cat(self) -> Optional[Animal]:
        if not self.cats:
            return None

        index = self.cats.pop(0)
        animal = self.stack.pop(index)
        self.total -= 1
        return animal
