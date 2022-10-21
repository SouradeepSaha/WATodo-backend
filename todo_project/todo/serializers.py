from rest_framework import serializers
from todo.models import Member, Task, Tag, Tasks_in_tags

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('dateOfBirth', 'email', 'username', 'password', 'first_name', 'last_name')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('username', 'task_id', 'task_name', 'task_description', 'status', 'task_created', 'task_started', 'task_due', 'priority')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('username', 'tag_name', 'color')
