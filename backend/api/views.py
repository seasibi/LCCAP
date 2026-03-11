from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CalendarEvent, Project
from .serializers import CalendarEventSerializer, ProjectSerializer


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


# Projects API Views
@api_view(['GET', 'POST'])
def projects_list(request):
    """
    List all projects or create a new project
    """
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, pk):
    """
    Retrieve, update or delete a project
    """
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def projects_by_pillar(request, pillar):
    """
    Get projects filtered by pillar
    """
    projects = Project.objects.filter(pillar=pillar)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
