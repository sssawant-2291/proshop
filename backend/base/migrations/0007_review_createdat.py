# Generated by Django 4.2.10 on 2024-03-04 10:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_product_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]