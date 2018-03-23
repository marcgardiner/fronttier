# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from django.contrib import admin

from frontier.admin import BaseAdmin
from survey.models import (Job, Survey, SurveyResponse,
                           QuestionTemplate, Question, Answer,
                           SurveyInvitation)


class JobAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + \
        ('company', 'type', 'level', 'status')


class SurveyAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('job', 'type', 'version')


class SurveyResponseAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('survey', 'user')


class QuestionTemplateForm(forms.ModelForm):
    class Meta:
        model = QuestionTemplate
        exclude = []

    def clean(self):
        return QuestionTemplate.clean_form(self)


class QuestionTemplateAdmin(BaseAdmin):
    form = QuestionTemplateForm
    list_display = BaseAdmin.list_display + ('name', 'type', 'prompt')


class QuestionAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('survey', 'template')


class AnswerAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('survey_response', 'question')


class SurveyInvitationAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + \
        ('survey', 'type', 'hiring_manager')


admin.site.register(Job, JobAdmin)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)
admin.site.register(QuestionTemplate, QuestionTemplateAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(SurveyInvitation, SurveyInvitationAdmin)
