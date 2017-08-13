from django.http.response import HttpResponse
from django.shortcuts import render
from django.conf import settings
import os


def index(request):
    with open(os.path.join(settings.REACT_APP_DIR, 'index.html')) as f:
        return HttpResponse(f.read())
