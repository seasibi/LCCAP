from rest_framework import serializers
from .models import SampleData


class SampleDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleData
        fields = ['id', 'name', 'value', 'created_at']
