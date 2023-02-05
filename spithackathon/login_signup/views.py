from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status,permissions,viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .models import *
from .serializers import *
from django.db.models import Q
import os
from sightengine.client import SightengineClient
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class createprofile(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = profileserializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_object(self):
        return self.request.user

class profileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = profileserializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        like = Profile.objects.filter(user_id=pk)
        data = profileserializer(like,many=True)
        return Response(data.data)

class createcontentdetails(generics.ListCreateAPIView):
    queryset = contentdetails.objects.all()
    serializer_class = contentdetailsserializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
    def get_object(self):
        return self.request.user

class contentDetaildetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = contentdetails.objects.all()
    serializer_class = contentdetailsserializer
    permission_classes = [permissions.IsAuthenticated]

    

class contentrecommendation(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentratingsserializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ratingreommendation(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentdetailsserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        contentno = contentrating.objects.all().values_list('content')
        print(contentno)

        dictnor = contentdetails.objects.filter(id__in=contentno)
        return dictnor


class searchreommendation(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentdetailsserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.GET.get('query')

        dictnor = contentdetails.objects.filter(Q(title__icontains=query)| Q(description__icontains=query)|Q(adult_rate__icontains=query))
        return dictnor


class moodbasedreommendation(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentdetailsserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.GET.get('query')

        dictnor = contentdetails.objects.filter(Q(title__icontains=query)| Q(description__icontains=query)|Q(category__icontains=query)|Q(adult_rate__icontains=query))
        return dictnor

class newsapi(APIView):
    def post(self, request):
#       for government scheme and policy
# business entertainment general health science sports technology

        category = self.request.FILES.get('category')
        content_id = self.request.data.get('content_id')

        client = SightengineClient('377537108', 'sxCd4WhwiGeF85jykwU8')
        output = client.check('nudity-2.0').video_sync("https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HZHnL4R6xj1hrqjd5/videoblocks-61cb81b22006b31b942b6d72_hjge9o3koy__35c3dc7a37ed97d9508f49a31c61ce7b__P360.mp4")
        print(output)
        print(output['data']['frames'][1]['nudity']['none'])

        test = output['data']['frames'][1]['nudity']['none']

        content = contentdetails.objects.get(id=content_id) 

        if(test>0.5):
            content.adult_type = 'A' 

        elif(0.3<test<0.5):
            content.adult_type = 'UA'
        
        else:
            content.adult_type = 'NA'
        
        content.save()

        return Response(output['data']['frames'][1]['nudity'])



        