from django.db import models


class TestSerializerModel(models.Model):
    text = models.CharField(max_length=50)
    number = models.IntegerField()
    is_something = models.BooleanField()
    email = models.CharField(max_length=256)
    slug = models.CharField(max_length=64)
    real = models.FloatField()
    password = models.CharField(max_length=50)
    generated = models.CharField(max_length=256)

    def save(self, *args, **kwargs):
        self.generated = f"{self.slug}:{str(self.number)}"
        super().save()
