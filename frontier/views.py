from functools import wraps

from django.http import HttpResponse
from django.shortcuts import redirect
from django.urls import reverse


def index(request):
    return redirect(reverse('web.app'), permanent=True)


def health(request):
    return HttpResponse()


def robots(request):
    data = '''
User-agent: *
Disallow: /static/
'''
    return HttpResponse(data.strip(), content_type='text/plain')
