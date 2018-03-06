# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import Applicant, HiringManager
from frontier.decorators import json_view, restrict
from frontier.utils import get_or_404
from survey.models import SurveyResponse


@restrict(HiringManager, Applicant)
@json_view(allowed_methods=['GET'])
def survey(request, token):
    survey_response = get_or_404(SurveyResponse, token)
    return survey_response.app_resource()
