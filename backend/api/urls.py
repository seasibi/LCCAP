from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('data/', views.sample_data_list, name='sample_data_list'),
    path('data/<int:pk>/', views.sample_data_detail, name='sample_data_detail'),
    
    # Calendar Events URLs
    path('calendar/events/', views.calendar_events_list, name='calendar_events_list'),
    path('calendar/events/<int:pk>/', views.calendar_event_detail, name='calendar_event_detail'),
]
