from django.urls import path
from backend_api import views

urlpatterns = [
	path('recipes/', views.recipe_list, name='recipes'),
	path('recipes/<int:pk>', views.recipe_detail, name='recipe'),
	path('categories/', views.recipe_category_list, name='categories'),
]
