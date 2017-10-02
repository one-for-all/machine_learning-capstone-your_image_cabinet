from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
import os


def index(request):
    with open(os.path.join(settings.REACT_APP_DIR, 'index.html')) as f:
        return HttpResponse(f.read())


def static(request, file):
    return redirect('https://storage.googleapis.com/image-cabinet/static'
                    '/'+file)
