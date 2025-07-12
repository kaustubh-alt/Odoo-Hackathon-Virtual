from django.contrib import admin
from .models import CustomUser, Post, Gallary
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Post)   
admin.site.register(Gallary)
