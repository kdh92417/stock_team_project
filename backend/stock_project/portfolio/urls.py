from django.urls    import path, include
from .              import views

urlpatterns = [
    # 게시판 글쓰기 / 게시판 상세내용 API
    path('write/', views.BasePortfolioView.as_view()),

    # path('detail/', views.SignUpView.as_view()),

    # path('company', )
]

