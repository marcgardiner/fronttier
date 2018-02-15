# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.crypto import get_random_string
from django.utils.translation import ugettext_lazy as _
from djchoices import ChoiceItem, DjangoChoices

from frontier.models import BaseModel


class BaseUser(BaseModel, AbstractUser):
    token_prefix = 'user'

    class Type(DjangoChoices):
        administrator = ChoiceItem()
        candidate = ChoiceItem()
        hiring_manager = ChoiceItem()

    REQUIRED_FIELDS = ['email', 'password']

    type = models.CharField(_('type'), choices=Type.choices, max_length=16)
    username = models.CharField(_('username'), max_length=64, unique=True,
                                default=get_random_string)
    email = models.EmailField(_('email address'), unique=True)

    def is_administrator(self):
        return self.type == Type.administrator

    def is_candidate(self):
        return self.type == Type.candidate

    def is_hiring_manager(self):
        return self.type == Type.hiring_manager


class AdministratorManager(models.Manager):
    def get_queryset(self):
        return super(AdministratorManager, self).get_queryset().filter(
            type=BaseUser.Type.administrator
        )


class Administrator(BaseUser):
    objects = AdministratorManager()

    class Meta:
        proxy = True
        verbose_name = 'Administrator'
        verbose_name_plural = 'Administrators'

    def save(*args, **kwargs):
        self.type = BaseUser.Type.administrator
        self.is_staff = True
        super(Administrator, self).save(*args, **kwargs)


class CandidateManager(models.Manager):
    def get_queryset(self):
        return super(CandidateManager, self).get_queryset().filter(
            type=BaseUser.Type.candidate
        )


class Candidate(BaseUser):
    objects = CandidateManager()

    class Meta:
        proxy = True
        verbose_name = 'Candidate'
        verbose_name_plural = 'Candidates'

    def save(*args, **kwargs):
        self.type = BaseUser.Type.candidate
        super(Candidate, self).save(*args, **kwargs)


class HiringManagerManager(models.Manager):
    def get_queryset(self):
        return super(HiringManagerManager, self).get_queryset().filter(
            type=BaseUser.Type.hiring_manager
        )


class HiringManager(BaseUser):
    objects = HiringManagerManager()

    class Meta:
        proxy = True
        verbose_name = 'Hiring Manager'
        verbose_name_plural = 'Hiring Managers'

    def save(*args, **kwargs):
        self.type = BaseUser.Type.hiring_manager
        super(HiringManager, self).save(*args, **kwargs)


def get_invite_code():
    return get_random_string(length=20)


class Invite(BaseModel):
    token_prefix = 'invite'

    class State(DjangoChoices):
        pending = ChoiceItem()
        in_progress = ChoiceItem()
        completed = ChoiceItem()

    email = models.EmailField(_('email address'))
    candidate = models.ForeignKey(Candidate, Candidate, null=True)
    code = models.CharField(_('code'), default=get_invite_code, max_length=16, unique=True)
    state = models.CharField(_('state'), max_length=20, default=State.pending)