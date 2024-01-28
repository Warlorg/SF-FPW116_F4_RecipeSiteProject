from rest_framework import serializers
from .models import *


class RecipeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Recipe
		fields = '__all__'


class RecipeCategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = RecipeCategory
		fields = '__all__'