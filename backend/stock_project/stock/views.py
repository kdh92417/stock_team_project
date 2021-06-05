from django.views           import View
from django.http            import JsonResponse
from django.db.models       import Count

from account.models        import Account
from companies.models      import Company
from portfolio.models      import (
    Portfolio,
    PortfolioStock
)


class MainView(View):
    def get(self, request):
        cp_list = Company.objects.all().order_by('-count_searching')[:5]
        pf_list = Portfolio.objects.select_related('user').order_by('-search_count')[:5]
        user_list = Portfolio.objects.values(
            'user_id'
        ).annotate(id_count=Count('user_id')).order_by('-id_count')[:5]

        cp_data = [{
            'company_id'           : cp.id,
            'company_name'         : cp.cp_name,
            'corp_code'            : cp.corp_code,
            'company_search_count' : cp.count_searching,
            'company_like'         : cp.total_like
        } for cp in cp_list]

        pf_data = [{
            'portfolio_id'           : pf.id,
            'portfolio_title'        : pf.name,
            'portfolio_create_date'  : pf.create_date,
            'portfolio_search_count' : pf.search_count,
            'portfolio_like_count'   : pf.total_like,
            'portfolio_user'         : pf.user.user_name,
        } for pf in pf_list]

        user_data = [{
            'counts_of_writers' : user['id_count'],
            'user_id'           : Account.objects.get(id=user['user_id']).user_id
        } for user in user_list]

        return JsonResponse({
            'status'               : 200,
            'message'              : 'success',
            'top5_company_list'    : cp_data,
            'top5_portfolio_list'  : pf_data,
            'top5_user_list'       : user_data
        }, status=200)