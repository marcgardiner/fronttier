# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import auth
from django.utils import timezone

from business.models import User, LoginLink, Administrator, Company
from frontier.decorators import (
    json_view, json_get_view, json_post_view, restrict)
from frontier.utils import get_or_4xx, Http401


@json_view()
def login_link(request, token=None):
    login_link = get_or_4xx(LoginLink, token)

    if request.method == 'GET':
        return login_link.app_resource()

    password = request.json.get('password')
    if login_link.password != password:
        return {'error': 'invalid password'}, 401

    user = login_link.user

    # Update the user profile with any fields that may be provided
    for attr in User.REGISTRATION_FIELDS:
        if not attr in request.json:
            continue
        setattr(user, attr, request.json[attr])

    user.save()

    if not user.is_complete():
        return {'error': 'registration incomplete'}, 403

    # Increment login count + login timestamp
    login_link.num_logins += 1
    login_link.last_login = timezone.now()
    login_link.save()

    auth.login(request, user)

    login_link.user.refresh_from_db()
    return login_link.app_resource()


@json_post_view()
def login(request):
    email = request.json.get('email')
    password = request.json.get('password')

    user = auth.authenticate(email=email, password=password)
    if user is None:
        return {'error': 'invalid password'}, 401

    auth.login(request, user)

    return user.app_resource()


@json_get_view()
def logout(request):
    auth.logout(request)


@json_get_view()
@restrict(Administrator)
def companies(request):
    return {
        'data': map(lambda c: c.app_resource(), Company.objects.all())
    }


@json_get_view()
def me(request):
    if not request.user.is_authenticated:
        raise Http401
    return request.user.app_resource()
