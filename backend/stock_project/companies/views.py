from django.views           import View
from django.http            import (
    JsonResponse
)

from companies.models       import Company


class SearchCPView(View):
    def get(self, request):
        cp_name = request.GET.get('cp_name', None)
        if cp_name != None:
            try:
                cp = Company.objects.get(cp_name=cp_name)
                cp.count_searching += 1
                cp.save()
                return JsonResponse({
                    'message'   : 'success',
                    'status'    : 200,
                    'cp_name'   : cp_name,
                    'corp_code' : cp.corp_code
                }, status=200)
            except Company.DoesNotExist:
                return JsonResponse({
                    'message' : 'Does Not Exist Company',
                    'status'  : 400
                }, status=400)
        else:
            return JsonResponse({'message' : 'Key_error', 'status' : 400}, status=400)