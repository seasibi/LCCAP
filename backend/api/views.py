from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SampleData, CalendarEvent
from .serializers import SampleDataSerializer, CalendarEventSerializer


@api_view(['GET'])
def hello_world(request):
    """
    Simple hello world endpoint
    """
    data = {
        'message': 'Hello from Django backend!',
        'status': 'success'
    }
    return Response(data)


@api_view(['GET', 'POST'])
def sample_data_list(request):
    """
    List all sample data or create a new sample data item
    """
    if request.method == 'GET':
        sample_data = SampleData.objects.all()
        serializer = SampleDataSerializer(sample_data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SampleDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def sample_data_detail(request, pk):
    """
    Retrieve, update or delete a sample data item
    """
    try:
        sample_data = SampleData.objects.get(pk=pk)
    except SampleData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SampleDataSerializer(sample_data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SampleDataSerializer(sample_data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        sample_data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Calendar Events API Views
@api_view(['GET', 'POST'])
def calendar_events_list(request):
    """
    List all calendar events or create a new calendar event
    """
    if request.method == 'GET':
        events = CalendarEvent.objects.all()
        serializer = CalendarEventSerializer(events, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CalendarEventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def calendar_event_detail(request, pk):
    """
    Retrieve, update or delete a calendar event
    """
    try:
        event = CalendarEvent.objects.get(pk=pk)
    except CalendarEvent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CalendarEventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CalendarEventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
