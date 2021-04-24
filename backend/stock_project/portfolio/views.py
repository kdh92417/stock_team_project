import json
from django.views       import View
from django.http        import (
    JsonResponse,
    HttpResponse
)

from account.utils      import login_required

class TotalPortfolioView(View):
    pass

class BasePortfolioView(View):
    @login_required
    def post(self, request):
        try:
            pf_data = json.loads(request.body)
            token = request.headers.get('Authorization', None)
            pf_name = pf_data['pofol_name']


        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR'}, status=400)



class CPSearchPortfolioView(View):
    pass


class CommentView(View):
    pass

