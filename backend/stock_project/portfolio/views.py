import json

from django.views          import View
from django.http           import JsonResponse
from django.core.paginator import Paginator
from django.db.models      import Q

from account.utils         import login_required
from account.models        import Account
from companies.models      import Company
from portfolio.models      import (
    Portfolio,
    PortfolioStock,
    Comment
)


# 게시판 리스트 전체 보기
class TotalPortfolioView(View):
    def get(self, request):
        try:
            company_name = request.GET.get('company_name', None)
            user_id = request.GET.get('user_id', None)
            pofol_filter = {}

            if company_name != None and company_name !='':
                pofol_filter['company__cp_name'] = company_name
            if user_id != None and user_id !='':
                pofol_filter['user__user_id'] = user_id

            board_list = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user', 'comment_set'
            ).filter(**pofol_filter).order_by('-create_date')

            page = request.GET.get('page', 1)
            paginator = Paginator(board_list, 8)

            if int(page) > paginator.num_pages:
                return JsonResponse({
                    'message' : 'There are no more Portfolio board',
                    'status'  : 404
                }, status=404)

            else:
                board_list = paginator.get_page(page)
                board_data = [{
                    'pofol_id'      : board.id,
                    'user_id'       : board.user.user_id,
                    'pofol_name'    : board.name,
                    'comment_count' : board.comment_set.count(),
                    'like_count'    : board.total_like,
                    'create_date'   : board.create_date,
                    'stock' : [{
                        'stock_name'   : stock.company.cp_name,
                        'stock_count'  : stock.shares_count,
                        'stock_amount' : stock.shares_amount
                    } for stock in board.portfoliostock_set.all()]
                } for board in board_list]

        except KeyError:
            return JsonResponse({'message': 'INVALID_KEYS', 'status' : 400}, status=400)

        return JsonResponse({'board_data' : board_data, 'status' : 200}, status=200)

class BasePortfolioView(View):
    # 게시판 내용 상세보기
    def get(self, request):
        try:
            board_id = request.GET.get('board_id', None)
            board = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user', 'comment_set'
            ).get(id=board_id)
            board.search_count += 1
            board.save()

            first_board_id = Portfolio.objects.all().first().id
            last_board_id  = Portfolio.objects.all().last().id

            if int(board_id) == first_board_id:
                previous_id = None
            else:
                previous_id = Portfolio.objects.filter(id__lt=board_id).last().id

            if int(board_id) >= last_board_id:
                next_id = None
            else:
                next_id = Portfolio.objects.filter(id__gt=board_id).first().id

            board_data = {
                'previous_board_id' : previous_id,
                'next_board_id'     : next_id,
                'user_id'           : board.user.user_id,
                'title'             : board.name,
                'content'           : board.content,
                'comment_count'     : board.comment_set.count(),
                'create_date'       : board.create_date,
                'like_count'        : board.total_like,
                'search_count'      : board.search_count,
                'stock'             : [{
                  'stock_name'   : stock.company.cp_name,
                  'stock_count'  : stock.shares_count,
                  'stock_amount' : stock.shares_amount
                }for stock in board.portfoliostock_set.all()]
            }

            comment_list = Comment.objects.select_related('user').filter(portfolio_id=board_id)

            comment_data = [{
                'comment_id'  : comment.id,
                'user_id'     : comment.user.user_id,
                'content'     : comment.content,
                'create_date' : comment.create_date,
            } for comment in comment_list]

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)

        except Portfolio.DoesNotExist:
            return JsonResponse({'message' : 'This Portfolio does not exist', 'status' : 400}, status=400)

        return JsonResponse({
            'message'      : 'SUCCESS',
            'status'       : 200,
            'board_data'   : board_data,
            'comment_data' : comment_data
        }, status=200)

    # 게시판 글쓰기
    @login_required
    def post(self, request):
        try:
            user = request.user
            pf_data = json.loads(request.body)
            stock_list = pf_data['stock']
            pf = Portfolio.objects.create(
                name    = pf_data['title'],
                content = pf_data['content'],
                user_id = user.id
            )

            does_not_exist_cp = []

            for stock in stock_list:
                if not Company.objects.filter(cp_name=stock['stock_name']).exists():
                    does_not_exist_cp.append(stock['stock_name'])

            for stock in stock_list:
                try:
                    cp = Company.objects.get(cp_name=stock['stock_name'])
                    PortfolioStock.objects.create(
                        company_id    = cp.id,
                        portfolio_id  = pf.id,
                        shares_count  = stock['stock_count'],
                        shares_amount = stock['stock_amount']
                    )
                except Company.DoesNotExist:
                    pf.delete()
                    return JsonResponse({
                        'status'  : 400,
                        'message' : 'Does Not Exist Company',
                        'Does_Not_Exists_Company' : does_not_exist_cp
                    }, status=200)

            user.type = '버핏'
            user.save()
            board_data = {
                'portfolio_id' : pf.id,
                'user_id'      : user.user_id,
                'title'        : pf.name,
                'create_date'  : pf.create_date,
                'like_count'   : pf.total_like,
                'stock': [{
                    'stock_name'  : stock['stock_name'],
                    'stock_count' : stock['stock_count'],
                    'stock_amount': stock['stock_amount']
                } for stock in stock_list]
            }

            return JsonResponse({'message' : 'SUCCESS', 'status' : 200, 'board_data' : board_data}, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)

    # 게시판 글삭제
    @login_required
    def delete(self, request):
        try:
            pf_id = json.loads(request.body)['portfolio_id']
            user  = request.user
            if not Portfolio.objects.filter(Q(id=pf_id) & Q(user_id=user.id)).exists():
                return JsonResponse({
                    'message': 'This Portfolio ID Does Not exist',
                    'status' : 400
                }, status=400)

            pf = Portfolio.objects.get(Q(id=pf_id) & Q(user_id=user.id))
            pf.delete()

            return JsonResponse({
                'message'          : 'success',
                'deleted_board_id' : int(pf_id),
                'status'           : 200,
            }, status=200)

        except KeyError:
            return JsonResponse({
                'message': 'INVALID_KEY',
                'status': 400
            }, status=400)


# 댓글 API
class CommentView(View):
    def get(self, request):
        try:
            portfolio_id = request.GET.get('portfolio_id', None)
            comment_list = Comment.objects.filter(portfolio_id=portfolio_id)

            comment_data = [{
                'comment_id'  : comment.id,
                'user_name'   : comment.user_name,
                'user_id'     : Account.objects.get(id=comment.user_id).user_id,
                'content'     : comment.content,
                'create_date' : comment.create_date
            } for comment in comment_list]

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status' : 400}, status=400)

        return JsonResponse({'comment_data' : comment_data, 'status' : 200}, status=200)

    @login_required
    def post(self, request):
        try:
            user = request.user
            if user.type != '버핏' and user.type !='manager':
                return JsonResponse({'message' : '버핏만 댓글을 작성할 수 있습니다.', 'status' : 400 }, status=400)
            comment_data = json.loads(request.body)
            comment_id = Comment.objects.create(
                user_name    = user.user_name,
                content      = comment_data['content'],
                portfolio_id = comment_data['portfolio_id'],
                user_id      = user.id
            ).id

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400 }, status=400)

        return JsonResponse({
            'message'    : 'SUCCESS',
            'status'     : 200,
            'user_id'    : user.user_id,
            'comment_id' : comment_id
        }, status=200)

    @login_required
    def put(self, request):
        try:
            user = request.user
            comment_data = json.loads(request.body)
            if Comment.objects.filter(Q(id=comment_data['comment_id']) & Q(user_id=user.id)).exists():
                user_comment         = Comment.objects.get(id=comment_data['comment_id'])
                user_comment.content = comment_data['board_content']
                user_comment.save()
                return JsonResponse({'message': 'success', 'status': 200}, status=200)
            else:
                return JsonResponse({'message': 'Invalid User or Comment', 'status': 400}, status=400)

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status' : 400}, status=400)

        except Comment.DoesNotExist:
            return JsonResponse({'message': 'This comment does not exist', 'status': 400}, status=400)

    @login_required
    def delete(self, request):
        try:
            user = request.user
            comment_data = json.loads(request.body)
            if Comment.objects.filter(Q(id=comment_data['comment_id']) & Q(user_id=user.id)).exists():
                user_comment = Comment.objects.get(id=comment_data['comment_id'])
                user_comment.delete()
                return JsonResponse({'message': 'success', 'status': 200}, status=200)
            else:
                return JsonResponse({'message': 'Invalid User or Comment', 'status': 400}, status=400)

        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR', 'status': 400}, status=400)

        except Comment.DoesNotExist:
            return JsonResponse({'message': 'This comment does not exist', 'status': 400}, status=400)


# 해당 유저아이디의 포폴 리스트 API
class UserIDPFView(View):
    def get(self, request):
        try:
            user_id = request.GET.get('user_id', None)
            pofol_filter = {}

            if user_id != None and user_id != '':
                pofol_filter['user__user_id'] = user_id

            board_list = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user', 'comment_set'
            ).filter(**pofol_filter).order_by('-create_date')

            page = request.GET.get('page', 1)
            paginator = Paginator(board_list, 8)

            if int(page) > paginator.num_pages:
                return JsonResponse({
                    'message': 'There are no more Portfolio board',
                    'status': 404
                }, status=404)

            else:
                board_list = paginator.get_page(page)
                board_data = [{
                    'pofol_id'     : board.id,
                    'user_id'      : board.user.user_id,
                    'pofol_name'   : board.name,
                    'like_count'   : board.total_like,
                    'comment_count': board.comment_set.count(),
                    'create_date'  : board.create_date,
                    'stock': [{
                        'stock_name'  : stock.company.cp_name,
                        'stock_count' : stock.shares_count,
                        'stock_amount': stock.shares_amount
                    } for stock in board.portfoliostock_set.all()]
                } for board in board_list]

        except KeyError:
            return JsonResponse({'message': 'INVALID_KEYS', 'status': 400}, status=400)

        return JsonResponse({'board_data': board_data, 'status': 200}, status=200)