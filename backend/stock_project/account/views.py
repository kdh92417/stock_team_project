import jwt
import json
import bcrypt

from django.views       import View
from django.http        import (
    JsonResponse,
    HttpResponse
)

from my_settings         import ALGORITHM
from stock.settings      import SECRET_KEY
from .models             import Account


class SignInView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        print(account_data)
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                account = Account.objects.get(user_id=account_data['user_id'])
                if bcrypt.checkpw(account_data['password'].encode('utf-8'), account.password.encode('utf-8')):
                    token = jwt.encode({'user_account' : account.id}, SECRET_KEY, algorithm=ALGORITHM)
                    return JsonResponse({'access_token' : token.decode('utf-8')}, status=200)

                return HttpResponse(status=401)

        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS'}, status=400)


class SignUpView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        print(account_data)
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                return JsonResponse({'message' : 'Aleady exists user'}, status=400)
            hashed_password = bcrypt.hashpw(account_data['password'].encode('utf-8'), bcrypt.gensalt())
            Account.objects.create(
                user_name = account_data['user_name'],
                user_id = account_data['user_id'],
                password = hashed_password.decode('utf-8'),
                email = account_data['email'],
                phone_number = account_data['phone_number'],
                birth_date = account_data['birth_date'],
                type = '주린이',
            )
            return HttpResponse(status = 200)

        except KeyError:
            return JsonResponse({'message' : 'INVALID_KEYS'}, status = 400)

