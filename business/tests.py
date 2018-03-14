# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import os

from django.test import TestCase, Client

from business.models import Applicant, LoginLink
from frontier.utils import serialize_datetime


class LoginLinkTestCase(TestCase):
    def setUp(self):
        app = Applicant.objects.create_user(
            'user', email='app@test.com', password='pwd')
        self.login_link = LoginLink.objects.create(user=app)

    def test_get(self):
        c = Client()
        response = c.get(os.path.join('/auth/login/', self.login_link.token))
        self.assertEqual(response.status_code, 200)
        self.assertEquals({
            'last_login': None,
            'num_logins': 0,
            'survey_response': {
                'token': None
            },
            'token': self.login_link.token,
            'user': {
                'company': None,
                'email': 'app@test.com',
                'first_name': None,
                'last_name': None,
                'token': self.login_link.user.token,
                'type': 'applicant'
            }
        }, json.loads(response.content))

    def test_post(self):
        c = Client()
        response = c.post(
            os.path.join('/auth/login/', self.login_link.token),
            json.dumps({'password': 'wrong'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)
        self.assertEquals({'error': 'invalid password'},
                          json.loads(response.content))

        response = c.post(
            os.path.join('/auth/login/', self.login_link.token),
            json.dumps({'password': self.login_link.password}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)
        self.assertEquals({'error': 'registration incomplete'},
                          json.loads(response.content))

        response = c.post(
            os.path.join('/auth/login/', self.login_link.token),
            json.dumps(
                {'password': self.login_link.password, 'first_name': 'A', 'last_name': 'Z'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.login_link.refresh_from_db()
        self.assertEquals({
            'last_login': serialize_datetime(self.login_link.last_login),
            'num_logins': 1,
            'survey_response': {
                'token': None
            },
            'token': self.login_link.token,
            'user': {
                'company': None,
                'email': 'app@test.com',
                'first_name': 'A',
                'last_name': 'Z',
                'token': self.login_link.user.token,
                'type': 'applicant'
            }
        }, json.loads(response.content))
