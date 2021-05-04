import json

from django.views           import View
from django.http            import JsonResponse

from companies.models       import Company
from portfolio.models       import Portfolio
from account.models         import Account
from .utils                 import manager_validate


class ManagerView(View):
    @manager_validate
    def get(self, request):
        pf_list = Portfolio.objects.select_related('user').order_by('-create_date')
        user_list = Account.objects.exclude(type='manager')

        pf_data = [{
            'id'           : pf.id,
            'title'        : pf.name,
            'user_id'      : pf.user.user_id,
            'user_name'    : pf.user.user_name,
            'search_count' : pf.search_count,
            'like_count'   : pf.total_like
        } for pf in pf_list]

        user_data = [{
            'id'    : user.id,
            'user_id' : user.user_id,
            'user_name' : user.user_name,
            'user_type' : user.type,
            'email'     : user.email,
            'birth_date': user.birth_date,
            'phone_number' : user.phone_number
        } for user in user_list]
        
        return JsonResponse({
            'message'        : 'success',
            'portfolio_list' : pf_data,
            'user_list'      : user_data,
            'status'         : 200
            }, status=200)

    @manager_validate
    def delete(self, request):
        try:
            pf_id = json.loads(request.body)['portfolio_id']

            if not Portfolio.objects.filter(id=pf_id).exists():
                return JsonResponse({
                    'message' : 'This Portfolio ID Does Not exist',
                    'status'  : 400
                    }, status=400)
            pf = Portfolio.objects.get(id=pf_id)
            pf.delete()

            return JsonResponse({
                'message' : 'success',
                'status'  : 200,
                }, status=200)
        
        except KeyError:
            return JsonResponse({
                'message' : 'INVALID_KEY',
                'status'  : 400
                }, status=400)


    @manager_validate
    def put(self, request):
        try:
            user_id = json.loads(request.body)['user_id']
            
            if not Account.objects.filter(user_id=user_id).exists():
                return JsonResponse({
                    'message' : 'This user does not exist.',
                    'status'  : 400
                    }, status=400)
            
            user = Account.objects.get(user_id=user_id)
            user.type = 'black'
            user.save()

            return JsonResponse({
                'message' : 'success',
                'status'  : 200
                }, status=200)


        except KeyError:
            return JsonResponse({
                'message' : 'INVALID_KEY',
                'status'  : 400
                }, status=400)
