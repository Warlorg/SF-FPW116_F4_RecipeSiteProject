from django.db import models


class RecipeCategory (models.Model):
	name = models.CharField(max_length=64, unique=True)

	class Meta:
		verbose_name = 'Category'  # Настройка отображения имени модели в админ-панели в ед.числе
		verbose_name_plural = 'Categories'  # Настройка отображения имени модели в админ-панели в мн.числе
		ordering = ['pk']

	def __str__(self):
		return self.name


class Recipe (models.Model):
	title = models.CharField(max_length=100, unique=True, blank=False, default='')
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	recipeCategory = models.ForeignKey(RecipeCategory, on_delete=models.CASCADE, related_name='recipes')
	photo = models.ImageField(blank=True)

	def __str__(self):
		return self.title
