import random
from typing import Any

from django.test import TestCase
from rest_framework.serializers import EmailField, ModelSerializer, SlugField, CharField

from .models import TestSerializerModel
# from .serializers import EmailField, ModelSerializer, SlugField, CharField


# Create your tests here.
class TestModelSerializer(ModelSerializer):
    email = EmailField()
    slug = SlugField()
    password = CharField(write_only=True)

    class Meta:
        model = TestSerializerModel
        fields = [
            "text",
            "number",
            "is_something",
            "email",
            "slug",
            "real",
            "password",
            "generated",
        ]
        read_only_fields = ["generated"]


class TestSerializer(TestCase):
    def create_random_data(self) -> dict:
        """Creates random data for test purposes."""
        return dict(
            text=str(random.randint(1000, 2000)),
            number=random.randint(0, 1000),
            is_something=random.choices([True, False])[0],
            slug=str(random.randint(1000, 2000)),
            email=f"{str(random.randint(10000, 20000))}@{random.randint(1000, 2000)}.com",
            real=random.randint(1000, 9999) / 100,
            password=str(random.randint(100000, 999999)),
        )

    def assertInstance(self, instance: Any, data: dict, exclude: list = list()):
        """Assert that all the values in the dictionary exists as a property in the
        instance."""
        if data and instance:
            for k, v in data.items():
                if k not in exclude:
                    assert hasattr(instance, k), (
                        f"Property {k} should exist in instance"
                    )
                    assert getattr(instance, k) == v, (
                        f"Property value '{v}' should be equals to instance value"
                    )

    def assertEqualDictionary(self, left: dict, right: dict, exclude: list = list()):
        """Assert that all the values in the right should exists in the left."""
        if right is not None and left is not None:
            for k, v in right.items():
                if k not in exclude:
                    assert left.get(k) is not None, (
                        f"Property {k} should be in left dictionary"
                    )
                    assert left.get(k) == v, (
                        f"Property value '{left.get(k)}' should be equals to right value {v}"
                    )

            for k, v in left.items():
                if k not in exclude:
                    assert right.get(k) is not None, (
                        f"Property {k} should be in right dictionary"
                    )
                    assert right.get(k) == v, (
                        f"Property value '{left.get(k)}' should be equals to right value {v}"
                    )

    def test_1_read(self):
        """We create a model on DB and then check the serialized data is correct."""
        data = self.create_random_data()
        instance = TestSerializerModel.objects.create(**data)
        serializer = TestModelSerializer(instance)
        self.assertIsNotNone(serializer.data, "Serializer should return some data")
        self.assertInstance(instance, serializer.data)
        self.assertEqualDictionary(serializer.data, data, ["password", "generated"])

    def test_2_create(self):
        """We create a model through the serializer and check that it was created
        correctly in DB."""
        data = self.create_random_data()
        serializer = TestModelSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        instance = TestSerializerModel.objects.last()
        self.assertInstance(instance, data)

    def test_3_update(self):
        """We update a model through the serializer and check that the values were
        correctly updated in DB."""
        data = self.create_random_data()
        instance = TestSerializerModel.objects.create(**data)
        previous_count = TestSerializerModel.objects.count()
        new_data = self.create_random_data()
        serializer = TestModelSerializer(instance, data=new_data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(previous_count, TestSerializerModel.objects.count())
        new_instance = TestSerializerModel.objects.get(id=instance.id)
        self.assertInstance(new_instance, new_data)

    def test_4_error_int(self):
        """We force an error on creation on the number field."""
        data = self.create_random_data()
        data["number"] = "15.5"
        serializer = TestModelSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIsNotNone(serializer.errors)
        self.assertEqual(len(serializer.errors), 1)
        self.assertTrue("number" in serializer.errors)

    def test_5_error_bool(self):
        """We force an error on creation on the bool field."""
        data = self.create_random_data()
        data["is_something"] = "jojo"
        serializer = TestModelSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIsNotNone(serializer.errors)
        self.assertEqual(len(serializer.errors), 1)
        self.assertTrue("is_something" in serializer.errors)

    def test_6_error_slug(self):
        """We force an error on creation on the slug field."""
        data = self.create_random_data()
        data["slug"] = "not_an_slug./$"
        serializer = TestModelSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIsNotNone(serializer.errors)
        self.assertEqual(len(serializer.errors), 1)
        self.assertTrue("slug" in serializer.errors)

    def test_7_error_email(self):
        """We force an error on creation on the email field."""
        data = self.create_random_data()
        data["email"] = "not_an_email"
        serializer = TestModelSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIsNotNone(serializer.errors)
        self.assertEqual(len(serializer.errors), 1)
        self.assertTrue("email" in serializer.errors)

    def test_8_write_only(self):
        """We create a model on DB and then check the serialized data without the
        write only field."""
        data = self.create_random_data()
        instance = TestSerializerModel.objects.create(**data)
        serializer = TestModelSerializer(instance)
        serialized_data = serializer.data
        self.assertIsNotNone(serialized_data)
        self.assertInstance(instance, serialized_data)
        self.assertFalse("password" in serialized_data)
        self.assertEqualDictionary(serializer.data, data, ["password", "generated"])

    def test_9_read_only(self):
        """We create a model through the serializer and check that it was created
        correctly skipping the read only field."""
        data = self.create_random_data()
        data["generated"] = "fixed"  # we write a wrong value in a generated field
        serializer = TestModelSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        instance = TestSerializerModel.objects.last()
        self.assertInstance(instance, data, ["generated"])
        self.assertNotEqual(instance.generated, data["generated"])
        self.assertEqual(instance.generated, f"{data['slug']}:{str(data['number'])}")
        self.assertEqualDictionary(serializer.data, data, ["password", "generated"])
