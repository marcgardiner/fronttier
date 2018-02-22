# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.postgres.fields import JSONField
from django.db import models
from jsonschema import validate

from frontier.models import BaseModel, LocationFields
from survey.schema import ANSWER_SCHEMA, QUESTION_SCHEMA


class Job(BaseModel, LocationFields):
    token_prefix = 'job'

    class Type(object):
        INTERN = 'intern'
        FULL_TIME = 'full_time'
        PART_TIME = 'part_time'
        CONTRACTOR = 'contractor'

        CHOICES = (
            (INTERN, 'Intern'),
            (FULL_TIME, 'Full-time'),
            (PART_TIME, 'Part-time'),
            (CONTRACTOR, 'Contractor')
        )

    class Level(object):
        ENTRY = 'entry'
        MID = 'mid'
        SENIOR = 'senior'

        CHOICES = (
            (ENTRY, 'Entry'),
            (MID, 'Mid'),
            (SENIOR, 'Senior')
        )

    class Status(object):
        OPEN = 'open'
        CLOSED = 'closed'

        CHOICES = (
            (OPEN, 'Open'),
            (CLOSED, 'Closed')
        )

    company = models.ForeignKey('business.Company', on_delete=models.CASCADE, related_name='jobs')
    hiring_managers = models.ManyToManyField('business.HiringManager', related_name='jobs')
    type = models.CharField(max_length=16, choices=Type.CHOICES)
    level = models.CharField(max_length=16, choices=Level.CHOICES)
    status = models.CharField(max_length=16, default=Status.OPEN, choices=Status.CHOICES)

    title = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)


class Survey(BaseModel):
    token_prefix = 'survey'

    class Type(object):
        HIRING_MANAGER = 'hiring_manager'
        EXEMPLAR = 'exemplar'
        CANDIDATE = 'candidate'

        CHOICES = (
            (HIRING_MANAGER, 'Hiring Manager'),
            (EXEMPLAR, 'Exemplar'),
            (CANDIDATE, 'Candidate')
        )

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='surveys')
    expiration_time = models.IntegerField()
    type = models.CharField(max_length=16, choices=Type.CHOICES)


class SurveyResponse(BaseModel):
    token_prefix = 'survey_resp'

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='responses')
    user = models.ForeignKey('business.User', null=True, on_delete=models.SET_NULL,
                             related_name='survey_responses')


class QuestionTemplate(BaseModel):
    token_prefix = 'question_tmpl'

    class Type(object):
        MULTI_CHOICE_MULTI_SELECT = 'multi_choice_multi_select'
        MULTI_CHOICE_SINGLE_SELECT = 'multi_choice_single_select'
        OPEN_ENDED_PARAGRAPH = 'open_ended_paragraph'
        OPEN_ENDED_MULTI_FIELDS = 'open_ended_multi_fields'
        REORDER = 'reorder'
        DRAG_DROP = 'drag_drop'
        TYPE_AHEAD = 'type_ahead'
        DROPDOWN = 'dropdown'
        RANK_ORDER_TABLE = 'rank_order_table'
        RANK_ORDER_MATRIX = 'rank_order_matrix'

        CHOICES = (
            (MULTI_CHOICE_MULTI_SELECT, 'Multiple Choice Multiple Select'),
            (MULTI_CHOICE_SINGLE_SELECT, 'Multiple Choice Single Select'),
            (OPEN_ENDED_PARAGRAPH, 'Open-ended Paragraph'),
            (OPEN_ENDED_MULTI_FIELDS, 'Open-ended Multiple Fields'),
            (REORDER, 'Reorder'),
            (DRAG_DROP, 'Drag & Drop'),
            (TYPE_AHEAD, 'Type Ahead'),
            (DROPDOWN, 'Dropdown'),
            (RANK_ORDER_TABLE, 'Rank Order Table'),
            (RANK_ORDER_MATRIX, 'Rank Order Matrix')
        )

    type = models.CharField(max_length=16, choices=Type.CHOICES)
    prompt = models.TextField()
    note = models.TextField()
    data = JSONField(default={})

    def save(self, *args, **kwargs):
        schema = QUESTION_SCHEMA[self.type]
        validate(self.data, schema)

        super(QuestionTemplate, self).save(*args, **kwargs)


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

    def save(self, *args, **kwargs):
        schema = ANSWER_SCHEMA[self.question.template.type]
        validate(self.data, schema)

        super(QuestionTemplate, self).save(*args, **kwargs)