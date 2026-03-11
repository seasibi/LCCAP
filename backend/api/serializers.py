from rest_framework import serializers
from .models import CalendarEvent, Project


class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ['id', 'event_name', 'pillar', 'office', 'date', 'duration', 'status', 'created_at', 'updated_at']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'pillar', 'office', 'project_name', 'accomplishment', 
            'target', 'actual', 'status', 'quarter', 'created_at', 'updated_at'
        ]
