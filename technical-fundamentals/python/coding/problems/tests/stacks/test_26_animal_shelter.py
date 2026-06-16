import importlib.util
from pathlib import Path

_PROBLEMS = Path(__file__).parents[2]


def _load(filename):
    spec = importlib.util.spec_from_file_location(filename, _PROBLEMS / filename)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_m = _load("26_animal_shelter.py")
AnimalShelter = _m.AnimalShelter


class TestAnimalShelter:
    def test_enqueue_and_dequeue(self):
        """enqueue and dequeue elements from queue"""
        shelter = AnimalShelter()
        shelter.enqueue("dog"); shelter.enqueue("cat"); shelter.enqueue("dog")
        assert shelter.dequeue_any().type == "dog"
        assert shelter.dequeue_any().type == "cat"
        shelter.enqueue("cat"); shelter.enqueue("dog")
        assert shelter.dequeue_dog().type == "dog"
        shelter.enqueue("dog")
        assert shelter.dequeue_cat().type == "cat"

    def test_dequeue_returns_none_when_empty(self):
        """dequeue methods return undefined when shelter is empty"""
        shelter = AnimalShelter()
        assert shelter.dequeue_any() is None
        assert shelter.dequeue_dog() is None
        assert shelter.dequeue_cat() is None
