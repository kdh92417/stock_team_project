# Generated by Django 3.0.7 on 2021-04-29 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_company_corp_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='cp_name',
            field=models.CharField(max_length=1000),
        ),
    ]
