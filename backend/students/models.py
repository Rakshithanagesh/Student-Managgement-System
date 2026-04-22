from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    usn = models.CharField(max_length=20)
    branch = models.CharField(max_length=50)
    year = models.IntegerField()
    semester = models.IntegerField()
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    sgpa = models.FloatField()
    cgpa = models.FloatField()
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    def __str__(self):
        return self.name
