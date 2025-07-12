from django.urls import path
from .views import SignUpView, LoginView, PostListView, CreatePostView, EditPostView, getrequest,GetUser

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'), # For all posts (optionally without post_id)
    path('posts/<int:userid>/', PostListView.as_view(), name='post-detail'),  # For specific post by id
    path('create-post/<int:userid>/', CreatePostView.as_view(), name='create-post'),  # Create post for user id
    path('edit-post/<int:userid>/', EditPostView.as_view(), name='edit-post'),
    path('requests/<int:userid>/',getrequest.as_view(), name='requests'),
    path('user/<int:userid>/',GetUser.as_view(),name="user profile")  # For requests by user id
]