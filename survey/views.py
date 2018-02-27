# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render

from business.models import User
from frontier.views import json_view
from frontier.utils import get_or_404
from survey.models import SurveyResponse


def user_is_hm_or_applicant(user):
    if not user.is_autheticated:
        return Fale
    return user.type in [
        User.Type.APPLICANT,
        User.Type.HIRING_MANAGER,
    ]


@user_passes_test(user_is_hm_or_applicant)
@json_view(allowed_methods=['GET'])
def survey(request, token):
    survey_response = get_or_404(SurveyResponse, token)
    return survey_response.app_resource()
