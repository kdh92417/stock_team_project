from django.test import (
    TestCase,
    Client
)

from companies.models import (
    Company,
    LikeCompany
)

class SearchCPViewTest(TestCase):
    def setUp(self):
        cp = Company.objects.create(
            cp_name   = 'test_company',
            corp_code = '1111',
        )

        cp.count_searching += 1
        cp.save()

    def tearDown(self):
        Company.objects.all().delete()

    def test_sarchCPView_get_success(self):
        client = Client()
        response = client.get('/company/search/?cp_name=test_company', content_type='application/json')
        result = {
            "message"   : "success",
            "status"    : 200,
            "cp_name"   : "test_company",
            "corp_code" : "1111",
            "like_count": 0
        }

        self.assertEqual(response.json(), result)
        self.assertEqual(response.status_code, 200)



