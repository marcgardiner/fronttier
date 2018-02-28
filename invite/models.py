# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.postgres.fields import ArrayField
from django.db import models

from business.models import HiringManager
from frontier.models import BaseModel
from survey.models import Survey


class InvitationTemplate(BaseModel):
    token_prefix = 'invitation_tmpl'

    html = models.TextField()
    subject = models.CharField(max_length=256)


class Invitation(BaseModel):
    token_prefix = 'invitation'

    class State(object):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        COMPLETE = 'complete'
        FAILED = 'failed'

        CHOICES = (
            (PENDING, 'Pending'),
            (IN_PROGRESS, 'In-progress'),
            (COMPLETE, 'Complete'),
            (FAILED, 'Failed'),
        )
    
    state = models.CharField(max_length=16, default=State.PENDING, choices=State.CHOICES)
    hiring_manager = models.ForeignKey(HiringManager, related_name='invitations')
    survey = models.ForeignKey(Survey, related_name='invitations')
    emails = ArrayField(models.EmailField())
    template = models.ForeignKey(InvitationTemplate, related_name='invitations')
