import jwt

from django.http        import JsonResponse
from my_settings        import ALGORITHM
from stock.settings     import SECRET_KEY
from account.models     import Account


def login_required(func):
    def wrapper(self, request, *args, **kwargs):
        access_token = request.headers.get("Authorization", None)

        if access_token is None:
            return JsonResponse({'message' : 'MISSING_TOKEN'}, status=401)

        try:
            decode_token = jwt.decode(access_token, SECRET_KEY, ALGORITHM)
            user_pk = decode_token['user_account']
            request.user = Account.objects.get(id=user_pk)

        except jwt.DecodeError:
            return JsonResponse({'message' : 'INVALID_TOKEN'}, status=402)

        return func(self, request, *args, **kwargs)

    return wrapper