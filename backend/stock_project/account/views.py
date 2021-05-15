import jwt
import json
import bcrypt

from django.views        import View
from django.db.models    import Q
from django.http         import JsonResponse

from my_settings         import ALGORITHM
from stock.settings      import SECRET_KEY
from .utils              import login_required

from .models             import Account
from portfolio.models    import (
    Portfolio,
    Comment,
    LikePortfolio,
)
from companies.models    import (
    LikeCompany,
    Company
)


class SignInView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                account = Account.objects.get(user_id=account_data['user_id'])
                if bcrypt.checkpw(account_data['password'].encode('utf-8'), account.password.encode('utf-8')):
                    token = jwt.encode({'user_account' : account.id}, SECRET_KEY, algorithm=ALGORITHM)
                    return JsonResponse({'access_token' : token.decode('utf-8'),
                                        'message' : 'success', 'status' : 200}, status=200)
                else:
                    return JsonResponse({'message' : 'PASSWORD DOES NOT REMATCH', 'status' : 401}, status=401)

            else:
                return JsonResponse({'message' : 'ID DOES NOT EXIST', 'status' : 402}, status=402)

        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS', 'status' : 400}, status=400)


class SignUpView(View):
    def post(self, request):
        account_data = json.loads(request.body)
        try:
            if Account.objects.filter(user_id=account_data['user_id']).exists():
                return JsonResponse({'message' : 'Aleady exists user', 'status' : 401}, status=401)
            if Account.objects.filter(email=account_data['email']).exists():
                return JsonResponse({'message' : 'Aleady exists email', 'status' : 402}, status=402)

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
            return JsonResponse({'message': 'success', 'status' : 200}, status=200)

        except KeyError:
            return JsonResponse({'message' : 'INVALID_KEYS', 'status' : 400}, status = 400)


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
                'board_id'           : board.id,
                'pofol_name'         : board.name,
                'pofol_like'         : board.total_like,
                'pofol_search_count' : board.search_count,
                'create_date'        : board.create_date
            }for board in Portfolio.objects.filter(user_id=user.id)]

            comment_list = [{
                'comment_id'      : comment.id,
                'pofol_id'        : comment.portfolio.id,
                'pofol_name'      : comment.portfolio.name,
                'comment_content' : comment.content,
                'create_date'     : comment.create_date
            }for comment in Comment.objects.select_related('portfolio').filter(user_id=user.id)]

            return JsonResponse({
                    'user_data'    : user_data,
                    'board_list'   : board_list,
                    'comment_list' : comment_list,
                    'status'       : 200
            }, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)


class PortfolioSelectView(View):
    # 해당 유저의 작성글 전체 삭제
    @login_required
    def delete(self, request):
        user = request.user
        Portfolio.objects.filter(user_id=user.id).delete()
        return JsonResponse({'message': 'success', 'status': 200}, status=200)

    # 해당 유저의 작성글 선택 삭제
    @login_required
    def post(self, request):
        try:
            user = request.user
            pf_list = json.loads(request.body)['delete_pf_id_list']
            Portfolio.objects.filter(Q(id__in=pf_list) & Q(user_id=user.id)).delete()

            board_list = Portfolio.objects.prefetch_related(
                'user', 'comment_set').filter(user_id=user.id).order_by('-create_date')
            board_data = [{
                'pofol_id'     : board.id,
                'user_id'      : board.user.user_id,
                'pofol_name'   : board.name,
                'comment_count': board.comment_set.count(),
                'like_count'   : board.total_like,
                'create_date'  : board.create_date
            } for board in board_list]

            return JsonResponse({'message'    : 'success',
                                 'status'     : 200,
                                 'board_list' : board_data
            }, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)


class CommentSelectView(View):
    # 해당 유저의 댓글 전체 삭제
    @login_required
    def delete(self, request):
        user = request.user
        Comment.objects.filter(user_id=user.id).delete()
        return JsonResponse({'message': 'success', 'status': 200}, status=200)

    # 해당 유저의 댓글 선택 삭제
    @login_required
    def post(self, request):
        try:
            user = request.user
            comment_list = json.loads(request.body)['delete_comment_id_list']
            Comment.objects.filter(Q(id__in=comment_list) & Q(user_id=user.id)).delete()
            comment_list = Comment.objects.filter(user_id=user.id)

            comment_data = [{
                'comment_id' : comment.id,
                'user_name'  : comment.user_name,
                'content'    : comment.content,
                'create_date': comment.create_date
            } for comment in comment_list]

            return JsonResponse({'message'           : 'success',
                                 'status'            : 200,
                                 'user_comment_list' : comment_data
            }, status=200)

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status': 400}, status=400)


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

            user_data = {
                'user_pk'     : user.id,
                'user_id'     : user.user_id,
                'user_name'   : user.user_name,
                'email'       : user.email,
                'phone_number': user.phone_number,
                'type'        : user.type,
                'birth_date'  : user.birth_date
            }

            return JsonResponse({'MESSAGE'   : 'SUCCESS',
                                 'status'    : 200,
                                 'user_info' : user_data
            }, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)


# EMAIL 변경 API
class UserEmailView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            if Account.objects.filter(email=modify_data['email']).exists():
                return JsonResponse({'message': 'This Email has already exists', 'status' : 200}, status=200)
            user.email = modify_data['email']
            user.save()

            user_data = {
                'user_pk'     : user.id,
                'user_id'     : user.user_id,
                'user_name'   : user.user_name,
                'email'       : user.email,
                'phone_number': user.phone_number,
                'type'        : user.type,
                'birth_date'  : user.birth_date
            }

            return JsonResponse({'MESSAGE'  : 'SUCCESS',
                                 'status'   : 200,
                                 'user_info': user_data
             }, status=200)

        except Exception as e:
            return JsonResponse({'message': e, 'status' : 400}, status=400)


# 이름 변경 API
class UserNameView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            user.user_name = modify_data['user_name']
            user.save()

            user_data = {
                'user_pk'     : user.id,
                'user_id'     : user.user_id,
                'user_name'   : user.user_name,
                'email'       : user.email,
                'phone_number': user.phone_number,
                'type'        : user.type,
                'birth_date'  : user.birth_date
            }

            return JsonResponse({'MESSAGE': 'SUCCESS',
                                 'status': 200,
                                 'user_info': user_data
             }, status=200)

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status' : 400}, status=400)


# 폰넘버 변경 API
class UserPhoneNumberView(View):
    @login_required
    def put(self, request):
        try:
            modify_data = json.loads(request.body)
            user = Account.objects.get(id=request.user.id)
            if Account.objects.filter(phone_number= modify_data['phone_number']).exists():
                return JsonResponse({'message': 'This PhoneNumber has already exists', 'status': 200}, status=200)

            user.phone_number = modify_data['phone_number']
            user.save()

            user_data = {
                'user_pk'     : user.id,
                'user_id'     : user.user_id,
                'user_name'   : user.user_name,
                'email'       : user.email,
                'phone_number': user.phone_number,
                'type'        : user.type,
                'birth_date'  : user.birth_date
            }

            return JsonResponse({'MESSAGE'  : 'SUCCESS',
                                 'status'   : 200,
                                 'user_info': user_data
                                 }, status=200)

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status' : 400}, status=400)


# 생일 변경 API
class UserBirthDateView(View):
    @login_required
    def put(self, request):
        try:
            modify_data     = json.loads(request.body)
            user            = Account.objects.get(id=request.user.id)
            user.birth_date = modify_data['birth_date']
            user.save()

            user_data = {
                'user_pk'     : user.id,
                'user_id'     : user.user_id,
                'user_name'   : user.user_name,
                'email'       : user.email,
                'phone_number': user.phone_number,
                'type'        : user.type,
                'birth_date'  : user.birth_date
            }

            return JsonResponse({'MESSAGE'  : 'SUCCESS',
                                 'status'   : 200,
                                 'user_info': user_data
                                 }, status=200)

        except Exception as e:
            return JsonResponse({'message': e, 'status' : 400}, status=400)


# 포트폴리오 좋아요 기능 API
class LikePFView(View):
    @login_required
    def post(self, request):
        user = request.user
        pf_id = json.loads(request.body)['pf_id']

        try:
            pf = Portfolio.objects.get(id=pf_id)
            if LikePortfolio.objects.filter(
                    Q(user_id=user.id) & Q(portfolio_id=pf_id)).exists():
                user_like_pf = LikePortfolio.objects.filter(
                    Q(user_id=user.id) & Q(portfolio_id=pf_id)).first()
                user_like_pf.delete()

                if pf.total_like > 0:
                    pf.total_like -= 1
                    pf.save()

                return JsonResponse({
                    'message'    : 'Dislike this Portfolio',
                    'status'     : 200,
                    'total_like' : pf.total_like,
                }, status=200)
            else:
                try:
                    LikePortfolio.objects.create(
                        user_id=user.id,
                        portfolio_id=pf_id
                    )
                    pf.total_like += 1
                    pf.save()
                    return JsonResponse({
                        'message'    : 'Like this Portfolio',
                        'status'     : 200,
                        'total_like' : pf.total_like
                    }, status=200)

                except Exception as e:
                    return JsonResponse({'message': e, 'status': 400}, status=400)

        except Exception as e:
            return JsonResponse({'message': e, 'status': 400}, status=400)


# 기업 좋아요 기능 API
class LikeCPView(View):
    @login_required
    def post(self, request):
        user = request.user
        cp_name = json.loads(request.body)['cp_name']

        try:
            cp = Company.objects.get(cp_name=cp_name)
            if LikeCompany.objects.filter(
                    Q(user_id=user.id) & Q(company_id=cp.id)).exists():
                user_like_pf = LikeCompany.objects.filter(
                    Q(user_id=user.id) & Q(company_id=cp.id)).first()
                user_like_pf.delete()

                if cp.total_like > 0:
                    cp.total_like -= 1
                    cp.save()

                return JsonResponse({
                    'message'    : 'Dislike this Company',
                    'status'     : 200,
                    'total_like' : cp.total_like,
                }, status=200)
            else:
                try:
                    LikeCompany.objects.create(
                        user_id=user.id,
                        company_id=cp.id
                    )
                    cp.total_like += 1
                    cp.save()
                    return JsonResponse({
                        'message'    : 'Like this Company',
                        'status'     : 200,
                        'total_like' : cp.total_like
                    }, status=200)

                except Exception as e:
                    return JsonResponse({'message': e, 'status': 400}, status=400)

        except Exception as e:
            return JsonResponse({'message': e, 'status': 400}, status=400)


# 유저의 좋아요 목록 API
class LikeInfoView(View):
    @login_required
    def get(self, request):
        user = request.user

        like_cp_list = LikeCompany.objects.select_related('company').filter(user_id=user.id)
        like_pf_list = LikePortfolio.objects.select_related('portfolio').filter(user_id=user.id)

        cp_data = [cp.company.cp_name for cp in like_cp_list]
        pf_data = [pf.portfolio.name for pf in like_pf_list]

        return JsonResponse({
            'message'             : 'success',
            'status'              : 200,
            'user_id'             : user.user_id,
            'like_company_list'   : cp_data,
            'like_portfolio_list' : pf_data
        }, status=200)