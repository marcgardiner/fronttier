# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import os

from django.test import TestCase, Client

from business.models import Company, HiringManager
from survey.models import Job, Survey, SurveyInvitation


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


class JobsTestCase(TestCase):
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

    def test_get(self):
        c = Client()
        self.assertTrue(c.login(username='elon@boring.com', password='pwd'))

        response = c.get('/survey/jobs')
        self.assertEqual(response.status_code, 200)

        jobs = json.loads(response.content)['jobs']
        self.assertEqual(len(jobs), 2)
        self.assertEqual(jobs, [j.app_resource() for j in self.jobs])
