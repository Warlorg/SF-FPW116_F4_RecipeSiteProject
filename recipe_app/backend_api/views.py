from django.shortcuts import render

from rest_framework.response import Response
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
			recipes = recipes.filter(title__icontains='title')

		serializer = RecipeSerializer(recipes, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = RecipeSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		count = Recipe.objects.all().delete()
		return Response(
			{'message': '{} Recipes were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def recipe_detail(request, pk):
	try:
		recipe = Recipe.objects.get(pk=pk)
	except Recipe.DoesNotExist:
		return Response({'message': 'The recipe does not exist!'}, status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = RecipeSerializer(recipe)
		return Response(serializer.data)

	elif request.method == 'PUT':
		serializer = RecipeSerializer(recipe, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		recipe.delete()
		return Response({'message': 'Recipe was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'DELETE'])
def recipe_category_list(request):
	if request.method == 'GET':
		categories = RecipeCategory.objects.all()
		serializer = RecipeCategorySerializer(categories, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = RecipeCategorySerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		category.delete()
		return Response(
			{'message': '{} Recipe category was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def recipe_category(request, pk):
	try:
		category = RecipeCategory.objects.get(pk=pk)
	except RecipeCategory.DoesNotExist:
		return Response({'message': 'The category does not exist!'}, status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = RecipeCategorySerializer(category)
		return Response(serializer.data)
