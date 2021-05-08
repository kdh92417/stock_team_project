import json, jwt

from django.views          import View
from django.http           import (
    JsonResponse,
    HttpResponse
)
from django.core.paginator import Paginator
from django.db.models      import Q

from account.utils         import login_required
from account.models        import Account
from companies.models      import Company
from portfolio.models      import (
    Portfolio,
    PortfolioStock,
    LikePortfolio,
    Comment
)

from my_settings            import ALGORITHM
from stock.settings         import SECRET_KEY


class TotalPortfolioView(View):
    def get(self, request):
        try:
            company_name = request.GET.get('company_name', None)

            if company_name != None:
                board_list = Portfolio.objects.prefetch_related(
                    'portfoliostock_set__company', 'user'
                ).filter(company__cp_name=company_name).order_by('-create_date')
            else:
                board_list = Portfolio.objects.prefetch_related(
                    'portfoliostock_set__company', 'user'
                ).order_by('-create_date')

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
                    'pofol_id'   : board.id,
                    'user_id'    : board.user.user_id,
                    'pofol_name' : board.name,
                    'like_count' : board.total_like,
                    'create_date': board.create_date,
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
                'portfoliostock_set__company', 'user'
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
                'like_count'        : board.total_like,
                'search_count'      : board.search_count,
                'stock'             : [{
                  'stock_name'   : stock.company.cp_name,
                  'stock_count'  : stock.shares_count,
                  'stock_amount' : stock.shares_amount
                }for stock in board.portfoliostock_set.all()]
            }

        except KeyError:
            return JsonResponse({'message' : 'SUCCESS', 'status' : 400}, status=400)

        return JsonResponse({'message' : 'SUCCESS', 'board_data': board_data, 'status' : 200}, status=200)

    @login_required
    def post(self, request):
        try:
            user = request.user
            pf_data = json.loads(request.body)
            stock_list = pf_data['stock']

            pf = Portfolio.objects.create(
                name = pf_data['title'],
                content = pf_data['content'],
                user_id = user.id
            )

            for stock in stock_list:
                try:
                    cp = Company.objects.get(cp_name=stock['stock_name'])
                    PortfolioStock.objects.create(
                        company_id = cp.id,
                        portfolio_id = pf.id,
                        shares_count = stock['stock_count'],
                        shares_amount = stock['stock_amount']
                    )
                except Company.DoesNotExist:
                    return JsonResponse({
                        'status'  : 400,
                        'message' : 'Does Not Exist Company'
                    }, status=400)

            board_data = {
                'portfolio_id' : pf.id,
                'user_id': user.user_id,
                'title': pf.name,
                'like_count': pf.total_like,
                'stock': [{
                    'stock_name': stock['stock_name'],
                    'stock_count': stock['stock_count'],
                    'stock_amount': stock['stock_amount']
                } for stock in stock_list]
            }

            return JsonResponse({'message' : 'SUCCESS', 'status' : 200, 'board_data' : board_data}, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)


class CommentView(View):
    def get(self, request):
        try:
            portfolio_id = request.GET.get('portfolio_id', None)
            comment_list = Comment.objects.filter(portfolio_id=portfolio_id)

            comment_data = [{
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
            comment_data = json.loads(request.body)
            Comment.objects.create(
                user_name = user.user_name,
                content = comment_data['content'],
                portfolio_id = comment_data['portfolio_id'],
                user_id = user.id
            )

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR', 'status' : 400}, status=400)

        return JsonResponse({'message' : 'SUCCESS', 'status' : 200}, status=200)