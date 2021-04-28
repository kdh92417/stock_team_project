from django.urls    import path
from .              import views

urlpatterns = [
    # 게시판 글쓰기 / 게시판 상세내용 API
    path('write/', views.BasePortfolioView.as_view()),
    # 게시판 리스트 페이지 & 원하는 기업이 있는 포폴 검색
    path('list/', views.TotalPortfolioView.as_view()),
]

