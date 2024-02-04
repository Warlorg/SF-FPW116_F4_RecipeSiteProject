# Generated by Django 5.0.1 on 2024-02-03 18:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='recipeCategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipes', to='backend_api.recipecategory'),
        ),
    ]