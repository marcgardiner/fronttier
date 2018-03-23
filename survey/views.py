# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import RegularUser, HiringManager, Company
from frontier.decorators import json_view, restrict
from frontier.models import BaseModelForm
from frontier.utils import get_or_4xx, Http400
from survey.models import Job, Survey, SurveyResponse, SurveyInvitation


@json_view(allowed_methods=['GET'])
@restrict(HiringManager, RegularUser)
def response(request, token):
    sr = get_or_4xx(SurveyResponse, token)
    if sr.user.token != request.user.token:
        return {
            'error': 'unauthorized'
        }, 401
    return sr.app_resource()


JobForm = BaseModelForm(
    Job,
    token_fields={
        'company': Company,
        'hiring_managers': HiringManager,
    }
)


@json_view()
@restrict(HiringManager)
def jobs(request):
    if request.method == 'GET':
        jobs = Job.objects.prefetch_related('surveys__responses')
        if not request.user.is_admin():
            jobs = jobs.filter(hiring_managers=request.user)
        return {
            'data': [job.app_resource() for job in jobs],
        }

    f = JobForm(request.json)
    if not f.is_valid():
        raise Http400(f.errors)

    job = f.save()

    return job.app_resource()


@json_view()
@restrict(HiringManager)
def job(request, token):
    job = get_or_4xx(Job, token)

    if request.method == 'POST':
        f = JobForm(request.json, instance=job)
        job = f.save()

    return job.app_resource()


@json_view(allowed_methods=['POST'])
@restrict(HiringManager)
def invite(request):
    emails = request.json['emails']

    _type = request.json['type']
    if _type not in (Survey.Type.EXEMPLAR, Survey.Type.APPLICANT):
        return {
            'error': 'type must be one of "exemplar" or "applicant"',
        }, 400

    job = get_or_4xx(Job, request.json['job'])

    surveys = sorted(Survey.objects.filter(
        job=job,
        type=_type
    ), key=lambda s: s.version, reverse=True)

    if not surveys:
        return {
            'error': 'no surveys found for this job & type',
        }, 400

    # Pick the latest version
    survey = surveys[0]

    invitation = SurveyInvitation.objects.create(
        hiring_manager=request.user,
        type=_type,
        survey=survey,
        emails=emails
    )

    return invitation.app_resource()
