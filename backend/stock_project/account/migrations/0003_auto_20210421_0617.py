# Generated by Django 3.0.7 on 2021-04-21 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_account_portfolio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='create_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
