from django.db      import models
from account.models import Account


class Company(models.Model):
    cp_name = models.CharField(max_length=50)
    count_searching = models.IntegerField(default=0)
    total_like      = models.IntegerField(default=0)
    user

    class Meta:
        db_table = 'companies'


class LikeCompany(models.Model):
    company = models.