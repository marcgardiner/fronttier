# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from collections import defaultdict
import json
import jsonschema
import re

from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models
from django.db.models.signals import post_save
from django.forms import ValidationError
from django.dispatch import receiver
from django.template import Template, Context

from frontier.models import BaseModel, LocationFieldsMixin
from frontier.utils import token_resource, collect_values


class Job(BaseModel, LocationFieldsMixin):
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
        'business.HiringManager', related_name='jobs', blank=True)
    type = models.CharField(max_length=16, choices=Type.CHOICES)
    level = models.CharField(max_length=16, choices=Level.CHOICES)
    status = models.CharField(
        max_length=16, default=Status.OPEN, choices=Status.CHOICES)

    title = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)

    hard_skills = JSONField()
    soft_skills = JSONField()

    @classmethod
    def clean_form_data(cls, data):
        required = ['city', 'country', 'state']
        for f in required:
            if not data.get(f):
                raise ValidationError('%s if a required field' % f)

        hard_skills = data.get('hard_skills', [])
        if len(hard_skills) < 3:
            raise ValidationError('Must provide at least 3 hard skills')
        for skill, tools in hard_skills.iteritems():
            if len(tools) < 3:
                raise ValidationError(
                    'Must provide at least 3 tools for %s' % skill)

        soft_skills = data.get('soft_skills', [])
        if len(soft_skills) < 3:
            raise ValidationError('Must provide at least 3 soft skills')
        for skill, tools in soft_skills.iteritems():
            if len(tools) < 3:
                raise ValidationError(
                    'Must provide at least 3 tasks for %s' % skill)

        return data

    def app_resource(self):
        surveys = defaultdict(lambda: defaultdict(int))
        for survey in self.surveys.all():
            typ = survey.type
            for response in survey.responses.all():
                surveys[typ][response.state] += 1
                surveys[typ]['total'] += 1

        res = {
            'token': self.token,
            'company': self.company.token,
            'type': self.type,
            'level': self.level,
            'status': self.status,
            'title': self.title,
            'description': self.description,
            'surveys': surveys,
            'hard_skills': self.hard_skills,
            'soft_skills': self.soft_skills,
            'hiring_managers': [
                hm.token for hm in self.hiring_managers.all()
            ],
        }
        res.update(self.location_resource())
        return res


class Survey(BaseModel):
    token_prefix = 'survey'

    class Type(object):
        HIRING_MANAGER = 'hiring_manager'
        EXEMPLAR = 'exemplar'
        APPLICANT = 'applicant'

        CHOICES = (
            (HIRING_MANAGER, 'Hiring Manager'),
            (EXEMPLAR, 'Exemplar'),
            (APPLICANT, 'Applicant')
        )

    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name='surveys')
    expiration_time = models.IntegerField(default=7 * 24 * 60 * 60)
    type = models.CharField(max_length=16, choices=Type.CHOICES)
    version = models.IntegerField(default=1)


class SurveyResponse(BaseModel):
    token_prefix = 'survey_resp'

    class Meta:
        verbose_name = 'Survey Response'
        verbose_name_plural = 'Survey Responses'

        unique_together = ('user', 'survey')

    class State(object):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        COMPLETE = 'complete'
        EXPIRED = 'expired'

        CHOICES = (
            (PENDING, 'Pending'),
            (IN_PROGRESS, 'In Progress'),
            (COMPLETE, 'Complete'),
            (EXPIRED, 'Expired')
        )

    state = models.CharField(
        max_length=16, default=State.PENDING, choices=State.CHOICES)
    survey = models.ForeignKey(
        Survey, on_delete=models.CASCADE, related_name='responses')
    user = models.ForeignKey('business.User', null=True, blank=True,
                             on_delete=models.SET_NULL,
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
            'user': self.user.app_resource(),
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
    segment = models.IntegerField(default=1)
    data = JSONField(default={}, blank=True)

    def __repr__(self):
        return '<%s: %s>' % (self.__class__.__name__, self.name)

    KEY_RE = re.compile(r'^[a-z][a-z0-9_]*$')

    @classmethod
    def clean_clean_data(cls, data):
        from survey.schema import QUESTION_SCHEMA

        schema = QUESTION_SCHEMA[data.get('type')]
        data = data.get('data')
        try:
            jsonschema.validate(schema, data)
        except jsonschema.exceptions.ValidationError as e:
            raise ValidationError(e.message)

        keys = collect_values(data, 'key')

        for key in keys:
            if not QuestionTemplate.KEY_RE.match(key):
                raise ValidationError('invalid key: %s' % key)

        if len(keys) != len(set(keys)):
            raise ValidationError('keys must be unique: %s' % keys)

        if 'num_items' in data:
            n = data['num_items']
            if n > len(data.get('items', [])) or n < 0:
                raise ValidationError('invalid num_items: %s' % n)

        return data


class Question(BaseModel):
    token_prefix = 'question'

    survey = models.ForeignKey(
        Survey, on_delete=models.CASCADE, related_name='questions')
    index = models.IntegerField()

    template = models.ForeignKey(
        QuestionTemplate, on_delete=models.CASCADE, related_name='questions')
    context = JSONField(default={}, blank=True)

    @property
    def type(self):
        return self.segment.type

    @property
    def segment(self):
        return self.template.segment

    @property
    def prompt(self):
        return self.template.prompt

    def app_resource(self):
        t = Template(json.dumps(self.template.data))
        c = self.context
        data = json.loads(t.render(Context(c)))

        return {
            'token': self.token,
            'type': self.type,
            'segment': self.segment,
            'index': self.index,
            'prompt': self.prompt,
            'note': self.template.note,
            'data': data,
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
        try:
            jsonschema.validate(self.data, schema)
        except jsonschema.exceptions.ValidationError as e:
            raise ValidationError(e.message)

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
        (Survey.Type.APPLICANT, 'Applicant'))
    )
    emails = ArrayField(models.EmailField())


@receiver(post_save, sender=SurveyInvitation)
def process_survey_invitation(sender, instance=None, created=False, **kw):
    from survey import tasks

    if instance.state == SurveyInvitation.State.PENDING:
        tasks.process_survey_invitation(instance.token)
