from django.urls    import path, include
from .              import views

urlpatterns = [
    path('login/', views.SignInView.as_view()),
    path('signup/', views.SignUpView.as_view()),
]