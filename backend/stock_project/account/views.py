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
from .utils              import login_required
from .models             import Account
from portfolio.models           import (
    Portfolio,
    Comment
)


class SignInView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        print(request.headers.get('Authorization', None))
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                account = Account.objects.get(user_id=account_data['user_id'])
                if bcrypt.checkpw(account_data['password'].encode('utf-8'), account.password.encode('utf-8')):
                    token = jwt.encode({'user_account' : account.id}, SECRET_KEY, algorithm=ALGORITHM)
                    return JsonResponse({'access_token' : token.decode('utf-8'),
                                        'message' : 'success'}, status=200)
                return HttpResponse(status=401)

        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS'}, status=400)


class SignUpView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                return JsonResponse({'message' : 'Aleady exists user'}, status=400)
            if Account.objects.filter(email=account_data['email']).exists():
                return JsonResponse({'message' : 'Aleady exists email'}, status=400)

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
            return JsonResponse({'message': 'success'}, status=200)

        except KeyError:
            return JsonResponse({'message' : 'INVALID_KEYS'}, status = 400)


class MyPage(View):
    @login_required
    def get(self, request):
        try:
            user = request.user
            user_data = {
                'user_pk'      : user.id,
                'user_id'      : user.user_id,
                'user_name'    : user.user_name,
                'email'        : user.email,
                'phone_number' : user.phone_number,
                'type'         : user.type,
                'birth_date'   : user.birth_date
            }

            board_list = [{
                'pofol_name'  : board.name,
                'pofol_like'  : board.total_like,
                'create_date' : board.create_date
            }for board in Portfolio.objects.filter(user_id=user.id)]

            comment_list = [{
                'pofol_name'      : comment.portfolio.name,
                'comment_content' : comment.content,
                'create_date'     : comment.create_date
            }for comment in Comment.objects.select_related('portfolio').filter(user_id=user.id)]

            return JsonResponse({
                    'user_data'    : user_data,
                    'board_list'   : board_list,
                    'comment_list' : comment_list
                 }, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=400)


# 비밀번호 변경 API
class UserPWView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            hashed_password = bcrypt.hashpw(modify_data['password'].encode('utf-8'), bcrypt.gensalt())
            user.password = hashed_password.decode('utf-8')
            user.save()
            return JsonResponse({'MESSAGE' : 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=400)


# EMAIL 변경 API
class UserEmailView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            user.email = modify_data['email']
            user.save()
            return JsonResponse({'MESSAGE': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE': 'KEY_ERROR'}, status=400)


# 이름 변경 API
class UserNameView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            user.user_name = modify_data['user_name']
            user.save()
            return JsonResponse({'MESSAGE': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE': 'KEY_ERROR'}, status=400)


# 폰넘버 변경 API
class UserPhoneNumberView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            user.phone_number = modify_data['phone_number']
            user.save()
            return JsonResponse({'MESSAGE': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE': 'KEY_ERROR'}, status=400)


