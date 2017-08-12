from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os

from . import serializers
from . import models
from scripts import describe_images


@api_view(['GET'])
def image_stream(request):
    images = models.CabinetImage.objects.all()
    if request.GET.get('all') is None and request.user.is_authenticated:
        images = images.exclude(
            social_descriptions__describer=request.user)
    serializer = serializers.CabinetImageSerializer(instance=images,
                                                    many=True)
    return Response({
        'images': serializer.data
    })


@api_view(['GET'])
def image_cabinet(request):
    if request.user.is_authenticated:
        images = models.CabinetImage.objects.filter(owner=request.user)
        serializer = serializers.CabinetImageSerializer(instance=images,
                                                        many=True)
        return Response({
            'images': serializer.data
        })
    else:
        return Response({
            'authentication': 'user not logged in'
        }, HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def image_upload(request):
    uploaded_image = request.FILES.get('image')
    if request.user.is_authenticated:
        serializer = serializers.CabinetImageSerializer(data={
            'owner': request.user.pk,
            'image': uploaded_image
        })
        if serializer.is_valid():
            serializer.save()
            description = serializer.data.get('description')
            print(description)
            return Response({
                'url': serializer.data.get('image'),
                'description': description
            })
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    else:
        tmp_path = default_storage.save('tmp/testimage', ContentFile(
            uploaded_image.read()))
        img_path = os.path.join(settings.MEDIA_ROOT, tmp_path)
        predicted_description = describe_images.describe(img_path)
        return Response({
            'description': predicted_description
        })


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def describe_image(request):
    serializer = serializers.SocialDescription(data=request.data, context={
        'user': request.user
    })
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, HTTP_201_CREATED)
    else:
        return Response(serializer.errors, HTTP_400_BAD_REQUEST)
