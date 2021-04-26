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
    pass

class BasePortfolioView(View):
    pass
    # 게시판 내용 상세보기
    # def get(self, request):
    #     try:
    #         board_id = request.GET.get('board_id', None)
    #         board = Portfolio.objects.prefetch_related('portfoliostock_set__company', 'user').filter(id=board_id)
    #
    #         board_data = {
    #             'user_name'  : board.user.user_name,
    #             'pofol_name' : board.name,
    #             'like_count' : board.total_like,
    #             'stock'      : [{
    #               'stock_name' : stock.company.name,
    #               'stock_count' : stock.shares_count,
    #               'stock_amount' : stock.shares_amount
    #             }for stock in board.portfoliostock_set.all()]
    #         }
    #
    #     except KeyError:
    #         return JsonResponse({'MESSAGE' : 'SUCCESS'}, status=200)

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


class CPSearchPortfolioView(View):
    pass


class CommentView(View):
    pass

