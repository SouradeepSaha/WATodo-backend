from rest_framework.decorators import api_view
from rest_framework.response import Response
from django import views
from rest_framework import viewsets, status
from todo.serializers import MemberSerializer, TaskSerializer, TagSerializer
from todo.models import Member, Task, Tag
# Create your views here.

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
  
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
  
@api_view(['GET', "POST"])
def MemberList(request):
    if request.method == 'GET':
        allMembers = Member.objects.all()
        serializer = MemberSerializer(allMembers, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            