from rest_framework import serializers
from .models import SampleData, CalendarEvent


class SampleDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleData
        fields = ['id', 'name', 'value', 'created_at']


class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ['id', 'event_name', 'pillar', 'office', 'date', 'duration', 'status', 'created_at', 'updated_at']
