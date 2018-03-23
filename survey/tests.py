# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.core.exceptions import ValidationError
from django.test import TestCase, Client

from business.models import Company, HiringManager, RegularUser
from survey.models import (
    Job, Survey, SurveyInvitation, SurveyResponse, QuestionTemplate)


class SurveyInviteTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name='The Boring Company')
        self.hm = HiringManager.objects.create_user(
            'elon', email='elon@boring.com', password='pwd')
        self.hm.company = self.company
        self.hm.save()
        self.job = Job.objects.create(
            company=self.company, type=Job.Type.INTERN,
            level=Job.Level.MID, title='Boring Engineer')
        self.survey = Survey.objects.create(
            job=self.job, expiration_time=1000, type=Survey.Type.EXEMPLAR)

    def test_post(self):
        c = Client()
        self.assertTrue(c.login(username='elon@boring.com', password='pwd'))

        data = {
            'emails': ['bojack@horseman.com'],
            'type': 'exemplar',
            'job': self.job.token,
        }
        response = c.post('/survey/invite', json.dumps(data),
                          content_type='application/json')
        self.assertEqual(response.status_code, 200)

        invitation = SurveyInvitation.objects.all()[0]
        self.assertEqual(json.loads(response.content), {
            'token': invitation.token,
        })

        self.assertEqual(invitation.survey, self.survey)
        self.assertEqual(invitation.hiring_manager, self.hm)
        self.assertEqual(invitation.type, Survey.Type.EXEMPLAR)
        self.assertEqual(invitation.emails, ['bojack@horseman.com'])


class JobTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name='The Boring Company')
        self.hm = HiringManager.objects.create_user(
            'elon', email='elon@boring.com', password='pwd')
        self.hm.company = self.company
        self.hm.save()
        job1 = Job.objects.create(
            company=self.company, type=Job.Type.INTERN,
            level=Job.Level.MID, title='Boring Engineer')
        job2 = Job.objects.create(
            company=self.company, type=Job.Type.FULL_TIME,
            level=Job.Level.ENTRY, title='Lawyer')
        self.jobs = [job1, job2]
        for job in self.jobs:
            job.hiring_managers.add(self.hm)
            job.save()

    def test_get_many(self):
        c = Client()
        self.assertTrue(c.login(username='elon@boring.com', password='pwd'))

        response = c.get('/survey/job')
        self.assertEqual(response.status_code, 200)

        jobs = json.loads(response.content)['data']
        self.assertEqual(len(jobs), 2)
        self.assertEqual(jobs, [j.app_resource() for j in self.jobs])


class SurveyTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name='The Boring Company')
        self.user = RegularUser.objects.create_user(
            'me', email='me@boring.com', password='pwd')
        self.job = Job.objects.create(
            company=self.company, type=Job.Type.INTERN,
            level=Job.Level.MID, title='Boring Engineer')
        self.survey = Survey.objects.create(
            job=self.job, expiration_time=1000, type=Survey.Type.EXEMPLAR)
        self.survey_response = SurveyResponse.objects.create(
            survey=self.survey,
            user=self.user,
        )

    def test_get(self):
        c = Client()
        self.assertTrue(c.login(username='me@boring.com', password='pwd'))

        response = c.get('/survey/response/%s' % self.survey_response.token)
        self.assertEqual(response.status_code, 200)

        resp = json.loads(response.content)
        self.assertEqual(resp, self.survey_response.app_resource())


class QuestionTemplateTestCase(TestCase):
    def test_validation(self):
        datas = [
            (
                QuestionTemplate.Type.MULTI_CHOICE_SINGLE_SELECT,
                # Unique keys
                {
                    'items': [
                        {
                            'value': 'a',
                            'key': 'a'
                        },
                        {
                            'value': 'b',
                            'key': 'a'
                        },
                    ]
                },
                False
            ),
            (
                QuestionTemplate.Type.MULTI_CHOICE_SINGLE_SELECT,
                # Invalid key
                {
                    'items': [
                        {
                            'value': 'a',
                            'key': '#a'
                        }
                    ]
                },
                False
            ),
            (
                QuestionTemplate.Type.MULTI_CHOICE_MULTI_SELECT,
                # Invalid key
                {
                    'items': [
                        {
                            'value': 'a',
                            'key': '#a'
                        }
                    ]
                },
                False
            ),
            (
                QuestionTemplate.Type.MULTI_CHOICE_MULTI_SELECT,
                # Invalid key
                {
                    'items': [
                        {
                            'value': 'a',
                            'key': 'a'
                        }
                    ],
                    'num_items': 2
                },
                False
            ),
            (
                QuestionTemplate.Type.MULTI_CHOICE_MULTI_SELECT,
                # Invalid key
                {
                    'items': [
                        {
                            'value': 'a',
                            'key': 'a'
                        }
                    ],
                    'num_items': 1
                },
                True
            ),
        ]

        class DummyForm(object):
            def __init__(self, data):
                self.cleaned_data = data

        for typ, data, valid in datas:
            try:
                QuestionTemplate.clean_form(DummyForm({
                    'type': typ,
                    'data': data,
                }))
            except ValidationError:
                self.assertFalse(valid)
