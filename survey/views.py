# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import Applicant, HiringManager
from frontier.decorators import json_view, restrict
from frontier.utils import get_or_404
from survey.models import Job, Survey, SurveyResponse, SurveyInvitation


@json_view(allowed_methods=['GET'])
@restrict(HiringManager, Applicant)
def response(request, token):
    return get_or_404(SurveyResponse, token).app_resource()


@json_view(allowed_methods=['GET'])
@restrict(HiringManager)
def jobs(request):
    jobs = Job.objects.prefetch_related('surveys__responses').filter(
        hiring_managers=request.hd_user)
    return {
        'jobs': [job.app_resource() for job in jobs],
    }


@json_view(allowed_methods=['POST'])
@restrict(HiringManager)
def invite(request):
    emails = request.json['emails']

    _type = request.json['type']
    if _type not in (Survey.Type.EXEMPLAR, Survey.Type.CANDIDATE):
        return {
            'error': 'type must be one of "exemplar" or "candidate"',
        }, 400

    job = get_or_404(Job, request.json['job'])

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
        hiring_manager=request.hd_user,
        type=_type,
        survey=survey,
        emails=emails
    )

    return invitation.app_resource()
