from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Post, Gallary
from .models import Request as ExchangeRequest  # Assuming your request table is named 'Request'
import base64
from django.core.files.base import ContentFile

def fix_base64_padding(b64_string):
    missing_padding = len(b64_string) % 4
    if missing_padding:
        b64_string += '=' * (4 - missing_padding)
    return b64_string

class SignUpView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username or not password or not email:
            return Response({'success': False, 'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(username=username).exists():
            return Response({'success': False, 'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.create_user(username=username, password=password, email=email)
        return Response({'success': True}, status=status.HTTP_201_CREATED)
    

class GetUser(APIView):
    def get(self, request,userid):
        requser = request.query_params.get('userid')
        if requser == userid:
            try:
                user =  CustomUser.objects.get(id=userid)
            except CustomUser.DoesNotExist:
                return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                user = CustomUser.objects.get(id=userid, visibility=True, block=False)

            except CustomUser.DoesNotExist:
                return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
                    'success': True,
                    'username': user.username,
                    'email': user.email,
                    'points': user.points,
                    'rating': user.rating,
                    'visibility': user.visibility,
                    'block': user.block
                }, status=status.HTTP_200_OK)
            
            
        

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({'success': True, 'userid': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class PostListView(APIView):
    def get(self, request, userid):
        postid = request.query_params.get('postid')
        selfpost = request.query_params.get('selfpost', 'false').lower() == 'true'

        if postid:
            try:
                post = Post.objects.get(id=postid, visible=True, status='open')
                # Increment views count
                post.views += 1
                post.save(update_fields=['views'])
                # Fetch all images from Gallary for this post
                gallery_images = [
                    request.build_absolute_uri(img.pic.url) if img.pic else None
                    for img in Gallary.objects.filter(postname=post)
                ]
                data = {
                    'id': post.id,
                    'title': post.title,
                    'description': post.description,
                    'size': post.size,
                    'thumbnail': post.thumbnail.url if post.thumbnail else None,
                    'price': str(post.price),
                    'views': post.views,
                    'gallery': gallery_images,
                }
                return Response({'success': True, 'post': data}, status=status.HTTP_200_OK)
            except Post.DoesNotExist:
                return Response({'success': False, 'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        # If selfpost is true, return all posts by this user
        if selfpost:
            posts = Post.objects.filter(userid__id=userid)
        else:
            # Else, return all posts except self, visible, and open
            posts = Post.objects.exclude(userid__id=userid).filter(visible=True, status='open')

        data = [
            {
                'id': post.id,
                'title': post.title,
                'description': post.description,
                'size': post.size,
                'thumbnail': post.thumbnail.url if post.thumbnail else None,
                'price': str(post.price),
                'views': post.views,
            }
            for post in posts
        ]
        return Response({'success': True, 'posts': data}, status=status.HTTP_200_OK)


class CreatePostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, userid):
        try:
            user = CustomUser.objects.get(id=userid)
        except CustomUser.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        title = request.data.get('title')
        description = request.data.get('description')
        damage = request.data.get('damage')
        size = request.data.get('size')
        price = request.data.get('price')
        status_field = request.data.get('status', 'open')
        visible_str = request.data.get('visible', 'true')
        visible = str(visible_str).lower() == 'true'


        # ⬅️ this is the critical change
        images = request.FILES.getlist('images')

        if not all([title, description, damage, size, price]) or not images:
            return Response({'success': False, 'error': 'Missing fields or images'}, status=status.HTTP_400_BAD_REQUEST)

        # Save thumbnail
        thumbnail = images[0]

        post = Post.objects.create(
            userid=user,
            title=title,
            description=description,
            damage=damage,
            size=size,
            thumbnail=thumbnail,
            price=price,
            status=status_field,
            visible=visible
        )

        # Save other images to gallery
        for idx, img_file in enumerate(images[1:], start=1):
            Gallary.objects.create(pic=img_file, postname=post)

        return Response({'success': True, 'post_id': post.id}, status=status.HTTP_201_CREATED)


class EditPostView(APIView):
    def post(self, request, userid, postid):
        # Get the post and check ownership
        try:
            post = Post.objects.get(id=postid, userid__id=userid)
        except Post.DoesNotExist:
            return Response({'success': False, 'error': 'Post not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)

        # Only update text fields
        title = request.data.get('title')
        description = request.data.get('description')
        damage = request.data.get('damage')
        size = request.data.get('size')
        price = request.data.get('price')
        status_field = request.data.get('status')
        visible = request.data.get('visible')

        if title is not None:
            post.title = title
        if description is not None:
            post.description = description
        if damage is not None:
            post.damage = damage
        if size is not None:
            post.size = size
        if price is not None:
            post.price = price
        if status_field is not None:
            post.status = status_field
        if visible is not None:
            post.visible = visible

        post.save()
        return Response({'success': True, 'message': 'Post updated successfully'}, status=status.HTTP_200_OK)

class ExchangeView(APIView):
    def post(self, request):
        post1_id = request.data.get('post1')
        post2_id = request.data.get('post2')
        userid = request.data.get('userid')

        if not all([post1_id, post2_id, userid]):
            return Response({'success': False, 'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=userid)
            post1 = Post.objects.get(id=post1_id)
            post2 = Post.objects.get(id=post2_id)
        except CustomUser.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Post.DoesNotExist:
            return Response({'success': False, 'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if post2 belongs to the user
        if post2.userid.id != user.id:
            return Response({'success': False, 'error': 'User does not own post2'}, status=status.HTTP_403_FORBIDDEN)

        # Add exchange request to post1's user
        ExchangeRequest.objects.create(
            from_user=user,
            to_user=post1.userid,
            post1=post1,
            post2=post2,
            status='pending'  # or whatever status field you use
        )

        return Response({'success': True, 'message': 'Exchange request sent'}, status=status.HTTP_201_CREATED)

# Create your views here.
class getrequest(APIView):
   
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request,userid):

        requests = ExchangeRequest.objects.filter(to_user=userid, status='pending')
        reqsdata = []
        for req in requests:
            reqsdata.append({
                'id': req.id,
                'from_user': req.from_user.username,
                'post1': {
                    'id': req.post1.id,
                    'title': req.post1.title,
                    'thumbnail': req.post1.thumbnail.url if req.post1.thumbnail else None
                },
                'post2': {
                    'id': req.post2.id,
                    'title': req.post2.title,
                    'thumbnail': req.post2.thumbnail.url if req.post2.thumbnail else None
                }
            })

        requests = ExchangeRequest.objects.filter(from_user=userid, status='pending')
        reqdata = []
        for req in requests:
            reqdata.append({
                'id': req.id,
                'from_user': req.from_user.username,
                'post1': {
                    'id': req.post1.id,
                    'title': req.post1.title,
                    'thumbnail': req.post1.thumbnail.url if req.post1.thumbnail else None
                },
                'post2': {
                    'id': req.post2.id,
                    'title': req.post2.title,
                    'thumbnail': req.post2.thumbnail.url if req.post2.thumbnail else None
                }
            })

        return Response({'success': True, 'requests': reqsdata,'requested':reqdata}, status=status.HTTP_200_OK)