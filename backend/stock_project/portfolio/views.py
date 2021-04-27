import json
from django.views       import View
from django.http        import (
    JsonResponse,
    HttpResponse
)

from account.utils      import login_required
from companies.models   import Company
from portfolio.models   import (
    Portfolio,
    PortfolioStock
)

class TotalPortfolioView(View):
    def get(self, request):
        company_name = request.GET.get('company_name', None)
        if company_name != None:
            board_list = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user'
            ).filter(company__cp_name=company_name)
        else:
            board_list = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user'
            ).all()

        board_data = [{
            'user_name'  : board.user.user_name,
            'pofol_name' : board.name,
            'like_count' : board.total_like,
            'stock' : [{
                'stock_name'   : stock.company.cp_name,
                'stock_count'  : stock.shares_count,
                'stock_amount' : stock.shares_amount
            } for stock in board.portfoliostock_set.all()]
        } for board in board_list]

        return JsonResponse({'board_data' : board_data}, status=200)


class BasePortfolioView(View):
    # 게시판 내용 상세보기
    def get(self, request):
        try:
            board_id = request.GET.get('board_id', None)
            board = Portfolio.objects.prefetch_related(
                'portfoliostock_set__company', 'user'
            ).get(id=board_id)

            board_data = {
                'user_name'  : board.user.user_name,
                'pofol_name' : board.name,
                'like_count' : board.total_like,
                'stock'      : [{
                  'stock_name' : stock.company.cp_name,
                  'stock_count' : stock.shares_count,
                  'stock_amount' : stock.shares_amount
                }for stock in board.portfoliostock_set.all()]
            }

            return JsonResponse({'board_data' : board_data,}, status=200)

        except KeyError:
            return JsonResponse({'MESSAGE' : 'SUCCESS'}, status=200)

    @login_required
    def post(self, request):
        try:
            user = request.user
            pf_data = json.loads(request.body)
            token = request.headers.get('Authorization', None)
            stock_list = pf_data['stock']

            pf_id = Portfolio.objects.create(
                name = pf_data['pofol_name'],
                content = pf_data['content'],
                user_id = user.id
            ).id

            for stock in stock_list:
                cp = Company.objects.get_or_create(cp_name=stock['stock_name'])
                PortfolioStock.objects.create(
                    company_id = cp[0].id,
                    portfolio_id = pf_id,
                    shares_count = stock['stock_count'],
                    sheres_amount = stock['stock_amount']
                )
            return JsonResponse({'MESAAGE' : 'SUCCSESS'}, status=200)

        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR'}, status=400)


class CommentView(View):
    pass

