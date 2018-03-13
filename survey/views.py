# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import Applicant, HiringManager
from frontier.decorators import json_view, restrict
from frontier.utils import get_or_404
from survey.models import Job, Survey, SurveyResponse, SurveyInvitation


@restrict(HiringManager, Applicant)
@json_view(allowed_methods=['GET'])
def response(request, token):
    return get_or_404(SurveyResponse, token).app_resource()


@restrict(HiringManager)
@json_view(allowed_methods=['POST'])
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

    invitation = Invitation(
        hiring_manager=request.hd_user,
        type=_type,
        survey=survey,
        emails=emails
    )
    invitation.save()

    return invitation.app_resource()
