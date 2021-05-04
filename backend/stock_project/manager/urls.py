from django.urls    import path
from .              import views

urlpatterns = [
    # 관리자 메인페이지
    path('', views.ManagerView.as_view()),

    # 포폴게시판 삭제 API
    path('pf/delete/', views.ManagerView.as_view()),

    # 유저등급 강등 API
    path('user/block/', views.ManagerView.as_view())
]
