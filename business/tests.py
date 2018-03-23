# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import os

from django.test import TestCase, Client

from business.models import RegularUser, LoginLink, Administrator, Company
from frontier.utils import serialize_datetime


class LoginLinkTestCase(TestCase):
    def setUp(self):
        app = RegularUser.objects.create_user(
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
                'type': 'regular',
                'city': None,
                'address1': None,
                'address2': None,
                'postal_code': None,
                'state': None,
                'country': None,
                'phone_number': None,
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
                'type': 'regular',
                'city': None,
                'address1': None,
                'address2': None,
                'postal_code': None,
                'state': None,
                'country': None,
                'phone_number': None,
            }
        }, json.loads(response.content))


class LoginTestCase(TestCase):
    def setUp(self):
        self.user = RegularUser.objects.create_user(
            'user', email='app@test.com', password='pwd')

    def test_get(self):
        c = Client()
        response = c.post('/auth/login', json.dumps({
            'email': self.user.email,
            'password': 'pwd',
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        self.assertEquals({
            'company': None,
            'email': 'app@test.com',
            'first_name': None,
            'last_name': None,
            'token': self.user.token,
            'type': 'regular',
            'city': None,
            'address1': None,
            'address2': None,
            'postal_code': None,
            'state': None,
            'country': None,
            'phone_number': None,
        }, json.loads(response.content))


class CompanyTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name='The Boring Company')
        self.user = Administrator.objects.create_user(
            'elon', email='elon@boring.com', password='pwd')

    def test_get_many(self):
        c = Client()
        self.assertTrue(c.login(username='elon@boring.com', password='pwd'))

        response = c.get('/auth/company')
        self.assertEqual(response.status_code, 200)

    def test_post(self):
        c = Client()
        self.assertTrue(c.login(username='elon@boring.com', password='pwd'))

        response = c.post(
            '/auth/company',
            json.dumps({
                'name': 'Space X',
                'logo': 'abc',
                'city': 'San Francisco',
                'state': 'CA',
                'country': 'US',
            }),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        token = json.loads(response.content)['token']
        company = Company.load(token)

        self.assertEqual(company.name, 'Space X')

        response = c.post(
            os.path.join('/auth/company', company.token),
            json.dumps({
                'name': 'Tesla',
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)['token'], company.token)

        company.refresh_from_db()
        self.assertEqual(company.name, 'Tesla')
