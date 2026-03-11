from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    
    # Calendar Events URLs
    path('calendar/events/', views.calendar_events_list, name='calendar_events_list'),
    path('calendar/events/<int:pk>/', views.calendar_event_detail, name='calendar_event_detail'),
    
    # Projects URLs
    path('projects/', views.projects_list, name='projects_list'),
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),
    path('projects/pillar/<str:pillar>/', views.projects_by_pillar, name='projects_by_pillar'),
]
