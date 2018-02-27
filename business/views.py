# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import auth

from business.models import User, LoginLink
from frontier.decorators import json_view
from frontier.utils import get_or_404


@json_view()
def login(request, token=None):
    login_link = get_or_404(LoginLink, token)

    if request.method == 'GET':
        return login_link.app_resource()

    password = request.json.get('password')
    user = auth.authenticate(username=login_link.user.email, password=password)

    if user is None:
        return {'error': 'invalid password'}, 401

    # Update the user profile with any fields that may be provided
    for attr in User.REGISTRATION_FIELDS:
        if not attr in request.json:
            continue
        setattr(user, attr, request.json[attr])

    user.save()

    if not user.is_complete():
        return {'error': 'registration incomplete'}, 404

    # Increment login count
    login_link.num_logins += 1
    login_link.save()

    auth.login(request, user)
    return login_link.app_resource()


@json_view(allowed_methods=['GET'])
def logout(request):
    auth.logout(request)
