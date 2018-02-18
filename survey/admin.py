# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from survey.models import Job, Survey, SurveyResponse, QuestionTemplate, Question, Answer


admin.site.register([
    Job,
    Survey,
    SurveyResponse,
    QuestionTemplate,
    Question,
    Answer
])