from random import choices
from django.db import models
from django.forms import DateField

class Member(models.Model): # id automatically generated by django 
   username = models.CharField(primary_key=True, max_length=50, unique=True)
   dateOfBirth = models.DateField()
   email = models.CharField(max_length=50)   
   password = models.CharField(max_length=50)
   first_name = models.CharField(max_length=100)
   last_name = models.CharField(max_length=100)


class Task(models.Model):
   STATUS_CODES = (
        ('NS', 'Not Started'),
        ('FI', 'Finished'),
        ('IP', 'In Progress'),
    )

   username = models.ForeignKey(Member, on_delete=models.CASCADE)
   task_id = models.IntegerField(primary_key=True)
   task_name = models.CharField(max_length=100)
   task_description = models.CharField(max_length=100)
   status = models.CharField(max_length=2, choices=STATUS_CODES)
   task_created = models.DateField(null=True)
   task_started = models.DateField(null=True)
   task_due = models.DateField(null=True)
   priority = models.IntegerField(null=True)

   class Meta:
      unique_together = [['username', 'task_id']]

class Tag(models.Model):
   username = models.ForeignKey(Member, on_delete=models.CASCADE)
   tag_name = models.CharField(max_length=100)
   color = models.CharField(max_length=10)
   class Meta:
      unique_together = [['username', 'tag_name']]
   

class Tasks_in_tags(models.Model):
   tag_name = models.CharField(max_length=10, primary_key=True)
   username = models.ForeignKey(Member, on_delete=models.CASCADE)
   task_id = models.IntegerField()
   class Meta:
      unique_together = [['username', 'tag_name', 'task_id']]
