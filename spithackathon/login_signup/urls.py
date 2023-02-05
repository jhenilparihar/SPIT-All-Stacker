
from django.shortcuts import render

# Create your views here.
from django.urls import path
from .views import RegistrationAPI,LoginAPI, UserAPI,createprofile,profileDetail,createcontentdetails,contentDetaildetails,ratingreommendation,contentrecommendation,searchreommendation,moodbasedreommendation,newsapi
from knox import views as knox_views

urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('userdetail',UserAPI.as_view(),name='userdetail'),
    path('profilecreate/',createprofile.as_view(),name='profilecreate'),
    path('profileDetail/<int:pk>/',profileDetail.as_view(),name='profiledetail'),
    path('createcontent/',createcontentdetails.as_view(),name='profilecreate'),
    path('contentDetail/<int:pk>/',contentDetaildetails.as_view(),name='profiledetail'),
    path('contentrating/',contentrecommendation.as_view(),name='contentrating'),
    path('ratingreommendation/',ratingreommendation.as_view(),name='rating'),
    path('searchreommendation/',searchreommendation.as_view(),name='search'),
    path('moodbasedreommendation/',moodbasedreommendation.as_view(),name='search'),
    path('nuditychecker/',newsapi.as_view(),name='news'),
]