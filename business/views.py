# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import auth
from django.utils import timezone

from business.models import User, LoginLink
from frontier.decorators import json_view
from frontier.utils import get_or_404


@json_view()
def login(request, token=None):
    login_link = get_or_404(LoginLink, token)

    if request.method == 'GET':
        return login_link.app_resource()

    password = request.json.get('password')
    if login_link.password != password:
        return {'error': 'invalid password'}, 401

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


@json_view(allowed_methods=['GET'])
def logout(request):
    auth.logout(request)
