# Generated by Django 3.0.7 on 2021-04-30 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_auto_20210427_0305'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='search_count',
            field=models.IntegerField(default=0),
        ),
    ]
