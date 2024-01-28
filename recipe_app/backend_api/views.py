from django.shortcuts import render
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view

from .models import *
from .serializers import RecipeSerializer, RecipeCategorySerializer


@api_view(['GET', 'POST', 'DELETE'])
def recipe_list(request):
	if request.method == 'GET':
		recipes = Recipe.objects.all()

		title = request.GET.get('title', None)
		if title is not None:
			recipes = recipes.filter(title__icontains=title)

		serializer = RecipeSerializer(recipes, many=True)
		return JsonResponse(serializer.data, safe=False)
		# 'safe=False' for objects serialization

	elif request.method == 'POST':
		recipe_data = JSONParser().parse(request)
		serializer = RecipeSerializer(data=recipe_data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		count = Recipe.objects.all().delete()
		return JsonResponse(
			{'message': '{} Recipes were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def recipe_detail(request, pk):
	try:
		recipe = Recipe.objects.get(pk=pk)
	except Recipe.DoesNotExist:
		return JsonResponse({'message': 'The recipe does not exist!'}, status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = RecipeSerializer(recipe)
		return JsonResponse(serializer.data)

	elif request.method == 'PUT':
		recipe_data = JSONParser().parse(request)
		serializer = RecipeSerializer(recipe, data=recipe_data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		recipe.delete()
		return JsonResponse({'message': 'Recipe was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'DELETE'])
def recipe_category_list(request):
	if request.method == 'GET':
		categories = RecipeCategory.objects.all()
		serializer = RecipeCategorySerializer(categories, many=True)
		return JsonResponse(serializer.data, safe=False)

	elif request.method == 'POST':
		recipe_category_data = JSONParser().parse(request)
		serializer = RecipeCategorySerializer(data=recipe_category_data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		category.delete()
		return JsonResponse(
			{'message': '{} Recipe category was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
