from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from django.contrib.auth import logout, login, authenticate

from . import serializers


@api_view(['POST'])
def signup(request):
    serializer = serializers.UserCreationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        email = serializer.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is None:
            return Response({'login': 'Log in failed'},
                            status=HTTP_400_BAD_REQUEST)
        else:
            login(request, user)
        return Response({
            'email': email
        }, status=HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def signin(request):
    if request.method == 'POST':
        serializer = serializers.UserLogInSerializer(data=request.data, context={
            'request': request
        })
        if serializer.is_valid():
            serializer.save()
            return Response({
                'email': serializer.data.get('email')
            })
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    else:
        is_authenticated = request.user.is_authenticated()
        return Response({
            'userLoggedIn': is_authenticated
        })


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def logout_user(request):
    logout(request)
    return Response()
