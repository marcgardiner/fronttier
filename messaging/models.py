# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from business.models import User
from frontier.models import BaseModel
from messaging import tasks


class Email(BaseModel):
    token_prefix = 'email'

    class State(object):
        PENDING = 'pending'
        SUCCESS = 'success'
        FAILED = 'failed'

        CHOICES = (
            (PENDING, 'Pending'),
            (SUCCESS, 'Success'),
            (FAILED, 'Failed'),
        )

    state = models.CharField(
        max_length=16, default=State.PENDING, choices=State.CHOICES)
    user = models.ForeignKey(User, related_name='emails')
    processed_at = models.DateTimeField(null=True)
    template = models.CharField(max_length=128)
    context = JSONField(default={}, blank=True)


@receiver(post_save, sender=Email)
def process_email(sender, instance=None, created=False, **kw):
    if instance.state == Email.State.PENDING:
        tasks.process_email(instance.token)
