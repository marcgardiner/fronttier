# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template import Template, Context
from jsonschema import validate

from frontier.models import BaseModel, LocationFields
from frontier.utils import token_resource


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

    company = models.ForeignKey(
        'business.Company', on_delete=models.CASCADE, related_name='jobs')
    hiring_managers = models.ManyToManyField(
        'business.HiringManager', related_name='jobs')
    type = models.CharField(max_length=16, choices=Type.CHOICES)
    level = models.CharField(max_length=16, choices=Level.CHOICES)
    status = models.CharField(
        max_length=16, default=Status.OPEN, choices=Status.CHOICES)

    title = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)

    def app_resource(self):
        return {
            'token': self.token,
            'company': self.company.token,
            'type': self.type,
            'level': self.level,
            'status': self.status,
            'title': self.title,
            'description': self.description
        }


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

    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name='surveys')
    expiration_time = models.IntegerField()  # in seconds
    type = models.CharField(max_length=16, choices=Type.CHOICES)
    version = models.IntegerField(default=1)


class SurveyResponse(BaseModel):
    token_prefix = 'survey_resp'

    class Meta:
        verbose_name = 'Survey Response'
        verbose_name_plural = 'Survey Responses'

        unique_together = ('user', 'survey')

    survey = models.ForeignKey(
        Survey, on_delete=models.CASCADE, related_name='responses')
    user = models.ForeignKey('business.User', null=True, blank=True, on_delete=models.SET_NULL,
                             related_name='survey_responses')

    def app_resource(self):
        questions = []
        for question in sorted(Question.objects.filter(
                survey=self.survey), key=lambda q: (q.segment, q.index)):
            resource = question.app_resource()
            answers = list(Answer.objects.filter(
                survey_response=self, question=question))
            if answers:
                resource['answer'] = answers[0].app_resource()

            questions.append(resource)

        return {
            'token': self.token,
            'type': self.survey.type,
            'user': token_resource(self.user),
            'questions': questions
        }


class QuestionTemplate(BaseModel):
    token_prefix = 'question_tmpl'

    class Meta:
        verbose_name = 'Question Template'
        verbose_name_plural = 'Question Templates'

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

    name = models.CharField(max_length=64, unique=True)
    type = models.CharField(max_length=32, choices=Type.CHOICES)
    prompt = models.TextField()
    note = models.TextField(null=True, blank=True)
    data = JSONField(default={}, blank=True)

    def clean(self):
        from survey.schema import QUESTION_SCHEMA

        schema = QUESTION_SCHEMA[self.type]
        validate(self.data, schema)


class Question(BaseModel):
    token_prefix = 'question'

    class Meta:
        unique_together = ('survey', 'segment', 'index')

    survey = models.ForeignKey(
        Survey, on_delete=models.CASCADE, related_name='questions')
    segment = models.IntegerField()
    index = models.IntegerField()

    template = models.ForeignKey(
        QuestionTemplate, on_delete=models.CASCADE, related_name='questions')
    context = JSONField(default={}, blank=True)

    def app_resource(self):
        t = Template(json.dumps(self.template.data))
        c = Context(self.context)

        return {
            'token': self.token,
            'segment': self.segment,
            'index': self.index,
            'prompt': self.template.prompt,
            'note': self.template.note,
            'data': json.loads(t.render(c)),
        }


class Answer(BaseModel):
    token_prefix = 'answer'

    class Meta:
        unique_together = ('survey_response', 'question')

    survey_response = models.ForeignKey(
        SurveyResponse, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='answers')
    data = JSONField()

    def clean(self):
        from survey.schema import ANSWER_SCHEMA

        schema = ANSWER_SCHEMA[self.question.template.type]
        validate(self.data, schema)

    def app_resource(self):
        return {
            'token': self.token,
            'data': self.data
        }


class SurveyInvitation(BaseModel):
    token_prefix = 'survey_invite'

    class Meta:
        verbose_name = 'Survey Invitation'
        verbose_name_plural = 'Survey Invitations'

    class State(object):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        SUCCESS = 'success'
        FAILED = 'failed'

        CHOICES = (
            (PENDING, 'Pending'),
            (IN_PROGRESS, 'In-progress'),
            (SUCCESS, 'success'),
            (FAILED, 'Failed'),
        )

    state = models.CharField(max_length=16, default=State.PENDING,
                             choices=State.CHOICES)
    hiring_manager = models.ForeignKey(
        'business.HiringManager', related_name='invitations')
    survey = models.ForeignKey('survey.Survey', related_name='invitations')
    type = models.CharField(max_length=16, choices=(
        (Survey.Type.EXEMPLAR, 'Exemplar'),
        (Survey.Type.CANDIDATE, 'Candidate'))
    )
    emails = ArrayField(models.EmailField())


@receiver(post_save, sender=SurveyInvitation)
def process_survey_invitation(sender, instance=None, created=False, **kw):
    from survey import tasks

    if instance.state == SurveyInvitation.State.PENDING:
        tasks.process_survey_invitation(instance.token)
