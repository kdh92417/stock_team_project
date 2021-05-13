from django.db        import models


class Account(models.Model):
    user_name    = models.CharField(max_length=45, null=False)
    user_id      = models.CharField(max_length=45, null=False, unique=True)
    password     = models.CharField(max_length=300, null=False)
    email        = models.EmailField(max_length=200, null=True, unique=True)
    phone_number = models.CharField(max_length=50, null=True)
    type         = models.CharField(max_length=20, null=True)
    birth_date   = models.CharField(max_length=50, null=True)
    create_date  = models.DateTimeField(auto_now_add=True, null=True)
    portfolio    = models.ManyToManyField('portfolio.Portfolio', through='portfolio.LikePortfolio', related_name='account_portfolio')

    class Meta:
        db_table = 'accounts'