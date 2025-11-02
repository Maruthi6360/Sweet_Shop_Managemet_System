from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Shop, Sweet


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ["id", "name"]


class SweetSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Sweet
        fields = ["id", "name", "category", "price", "quantity", "shop"]


class RegisterSerializer(serializers.ModelSerializer):
    shop_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["username", "password", "shop_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        shop_name = validated_data.pop("shop_name", "")
        user = User.objects.create_user(**validated_data)

        if shop_name:
            Shop.objects.create(owner=user, name=shop_name)

        return user
