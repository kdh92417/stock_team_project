# --- xml 데이터 받아오기 위한 모듈 ---
# from urllib.request import urlopen
# from io import BytesIO
# from zipfile import ZipFile

import os
import django

from companies.models import *
import xml.etree.ElementTree as ET

os.environ.setdefault("DJANGO_SETTINGS_MODULE","stock.settings")
django.setup()


# API KEY 지정
# api_key = 'b40deae54438a9915d18001c4ade2bf1e7f0f44c'

# 회사고유번호 파일 저장하기
# url = f'https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={api_key}'
# with urlopen(url) as zipresp:
#     with ZipFile(BytesIO(zipresp.read())) as zfile:
#         zfile.extractall('corp_num')

tree = ET.parse('CORPCODE.xml')
root = tree.getroot()

for i in root.iter("list"):
    cp_name = i.findtext('corp_name')
    corp_code = i.findtext('corp_code')

    Company.objects.get_or_create(
        cp_name = cp_name,
        corp_code = str(corp_code)
    )



