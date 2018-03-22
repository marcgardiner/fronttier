# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import jsonschema
import re

from django import forms
from django.contrib import admin

from frontier.admin import BaseAdmin
from frontier.utils import collect_values
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


KEY_RE = re.compile(r'^[a-z][a-z0-9_]*$')


class QuestionTemplateForm(forms.ModelForm):
    class Meta:
        model = QuestionTemplate
        exclude = []

    def clean(self):
        from survey.schema import QUESTION_SCHEMA

        schema = QUESTION_SCHEMA[self.cleaned_data.get('type')]
        data = self.cleaned_data.get('data')
        try:
            jsonschema.validate(schema, data)
        except jsonschema.exceptions.ValidationError as e:
            raise forms.ValidationError(e.message)

        keys = collect_values(data, 'key')

        for key in keys:
            if not KEY_RE.match(key):
                raise forms.ValidationError('invalid key: %s' % key)

        if len(keys) != len(set(keys)):
            raise forms.ValidationError('keys must be unique: %s' % keys)

        if 'num_items' in data:
            n = data['num_items']
            if n > len(data.get('items', [])) or n < 0:
                raise forms.ValidationError('invalid num_items: %s' % n)

        return self.cleaned_data


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
