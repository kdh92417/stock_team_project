from django.urls    import path
from .              import views

urlpatterns = [
    # 로그인
    path('login/', views.SignInView.as_view()),
    # 회원가입
    path('signup/', views.SignUpView.as_view()),
    # 마이페이지
    path('user/', views.MyPage.as_view()),
    # 비밀번호 변경
    path('user/password/', views.UserPWView.as_view()),
    # 이름 변경
    path('user/name/', views.UserNameView.as_view()),
    # 이메일 변경
    path('user/email/', views.UserEmailView.as_view()),
    # 폰번호 변경
    path('user/phone/', views.UserPhoneNumberView.as_view()),
    # 생일 변경
    path('user/birth-date/', views.UserBirthDateView.as_view()),
    # 포트폴리오 좋아요 API
    path('like/portfolio/', views.LikePFView.as_view()),
    # 기업 좋아요 API
    path('like/company/', views.LikeCPView.as_view()),
    # 유저의 좋아요 리스트 API
    path('like/list/', views.LikeInfoView.as_view())
]