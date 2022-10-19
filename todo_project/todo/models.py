from django.db import models

class Member(models.Model):
  uid = models.IntegerField
  dateOfBirth = models.DateField
  username = models.CharField(max_length=50, unique=True)
  name = models.CharField(max_length=100)
  classification = models.CharField(max_length=100)
  language = models.CharField(max_length=100)


class Task(models.Model):
   name = models.CharField(max_length=100)
   birth_year = models.CharField(max_length=10)
   eye_color = models.CharField(max_length=10)

class Tag(models.Model):
   name = models.CharField(max_length=100)
   birth_year = models.CharField(max_length=10)
   eye_color = models.CharField(max_length=10)
   species = models.ForeignKey(Species, on_delete=models.DO_NOTHING)