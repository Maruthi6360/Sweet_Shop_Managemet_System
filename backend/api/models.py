from django.db import models
from django.contrib.auth.models import User


class Shop(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="shop")
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Sweet(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="sweets")
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.shop.name})"
