from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('data/', views.sample_data_list, name='sample_data_list'),
    path('data/<int:pk>/', views.sample_data_detail, name='sample_data_detail'),
]
