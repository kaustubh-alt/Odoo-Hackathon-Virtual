# accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add your custom fields here
    points = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    visibility = models.BooleanField(default=True)
    block = models.BooleanField(default=False)
    # Removed groups and user_permissions fields

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    damage = models.TextField()
    size = models.CharField(max_length=5)
    thumbnail = models.ImageField(upload_to='gallary/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='available')
    visible = models.BooleanField(default=True)
    views = models.IntegerField(default=0)

class Gallary(models.Model):
    id = models.AutoField(primary_key=True)
    pic = models.ImageField(upload_to='gallary/')
    postname = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='gallary_posts', null=True, blank=True)

class Request(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='exchange_requests_sent')
    to_user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='exchange_requests_received')
    post1 = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='exchange_post1')
    post2 = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='exchange_post2')
    status = models.CharField(max_length=20, default='pending')  # e.g., pending, accepted, rejected
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Exchange from {self.from_user.username} to {self.to_user.username} (Post {self.post1.id} <-> Post {self.post2.id})"