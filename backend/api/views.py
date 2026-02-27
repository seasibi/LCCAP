from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SampleData
from .serializers import SampleDataSerializer


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
