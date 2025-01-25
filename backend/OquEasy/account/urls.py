from django.urls import path, include

from . import views


urlpatterns = [
    path('', include('rest_framework.urls')),
    path('register/', views.UserRegistrationView.as_view()),
    path('reset-password-request/', views.RequestPasswordResetView.as_view(), name='password_reset_request'),
    path('reset-password/<slug:token>/', views.PasswordResetView.as_view(), name='password_reset'),
]

