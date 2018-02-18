# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.postgres.fields import JSONField
from django.db import models
from djchoices import ChoiceItem, DjangoChoices

from frontier.models import BaseModel, LocationFields


class Job(BaseModel, LocationFields):
    token_prefix = 'job'

    class Type(DjangoChoices):
        intern = ChoiceItem()
        full_time = ChoiceItem()
        part_time = ChoiceItem()
        contractor = ChoiceItem()

    class Level(DjangoChoices):
        entry = ChoiceItem()
        mid = ChoiceItem()
        senior = ChoiceItem()

    class Status(DjangoChoices):
        open = ChoiceItem()
        closed = ChoiceItem()

    company = models.ForeignKey('business.Company', on_delete=models.CASCADE, related_name='jobs')
    hiring_managers = models.ManyToManyField('business.HiringManager', related_name='jobs')
    type = models.CharField(max_length=16, choices=Type.choices)
    level = models.CharField(max_length=16, choices=Level.choices)
    status = models.CharField(max_length=16, default=Status.open, choices=Status.choices)

    title = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)


class Survey(BaseModel):
    token_prefix = 'survey'

    class Type(DjangoChoices):
        hiring_manager = ChoiceItem()
        exemplar = ChoiceItem()
        candidate = ChoiceItem()

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='surveys')
    expiration_time = models.IntegerField()
    type = models.CharField(max_length=16, choices=Type.choices)


class SurveyResponse(BaseModel):
    token_prefix = 'survey_resp'

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='responses')
    user = models.ForeignKey('business.User', null=True, on_delete=models.SET_NULL,
                             related_name='survey_responses')


class QuestionTemplate(BaseModel):
    token_prefix = 'question_tmpl'

    class Type(DjangoChoices):
        multiple_choice_multi_select = ChoiceItem()
        multiple_choice_single_select = ChoiceItem()
        open_ended_paragraph = ChoiceItem()
        open_ended_multi_fields = ChoiceItem()
        reorder = ChoiceItem()
        drag_drop = ChoiceItem()
        type_ahead = ChoiceItem()
        drop_down = ChoiceItem()
        rank_order_table = ChoiceItem()
        rank_order_matrix = ChoiceItem()

    type = models.CharField(max_length=16, choices=Type.choices)
    prompt = models.TextField()
    note = models.TextField()
    data = JSONField(default={})


class Question(BaseModel):
    token_prefix = 'question'

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='questions')
    segment = models.IntegerField()
    index = models.IntegerField()

    template = models.ForeignKey(QuestionTemplate, on_delete=models.CASCADE, related_name='questions')
    context = JSONField(default={})


class Answer(BaseModel):
    token_prefix = 'answer'

    survey_response = models.ForeignKey(SurveyResponse, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    data = JSONField(default={})
