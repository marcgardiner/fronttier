# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.crypto import get_random_string
from django.utils.translation import ugettext_lazy as _
from djchoices import ChoiceItem, DjangoChoices

from frontier.models import AddressFields, BaseModel


class User(BaseModel, AbstractUser, AddressFields):
    token_prefix = 'user'

    class Type(DjangoChoices):
        administrator = ChoiceItem()
        applicant = ChoiceItem()
        hiring_manager = ChoiceItem()

    REQUIRED_FIELDS = ['email', 'password']

    type = models.CharField(choices=Type.choices, max_length=16)
    username = models.CharField(max_length=64, unique=True, default=get_random_string)
    email = models.EmailField(unique=True)
    company = models.ForeignKey('business.Company', null=True, on_delete=models.SET_NULL)

    def is_administrator(self):
        return self.type == Type.administrator

    def is_hiring_manager(self):
        return self.type == Type.hiring_manager

    def is_applicant(self):
        return self.type == Type.applicant

    def rich_user(self):
        if type(self) is not User:
            return self

        if self.type == Type.administrator:
            return Administrator.objects.get(token=self.token)
        elif self.type == Type.applicant:
            return Applicant.objects.get(token=self.token)
        elif self.type == Type.hiring_manager:
            return HiringManager.objects.get(token=self.token)


class AdministratorManager(models.Manager):
    def get_queryset(self):
        return super(AdministratorManager, self).get_queryset().filter(
            type=User.Type.administrator
        )


class Administrator(User):
    token_prefix = 'admin'
    objects = AdministratorManager()

    class Meta:
        proxy = True
        verbose_name = 'Administrator'
        verbose_name_plural = 'Administrators'

    def save(self, *args, **kwargs):
        self.type = User.Type.administrator
        self.is_staff = True
        super(Administrator, self).save(*args, **kwargs)


class ApplicantManager(models.Manager):
    def get_queryset(self):
        return super(ApplicantManager, self).get_queryset().filter(
            type=User.Type.applicant
        )


class Applicant(User):
    token_prefix = 'applicant'
    objects = ApplicantManager()

    class Meta:
        proxy = True
        verbose_name = 'Applicant'
        verbose_name_plural = 'Applicants'

    def save(self, *args, **kwargs):
        self.type = User.Type.applicant
        super(Applicant, self).save(*args, **kwargs)


class HiringManagerManager(models.Manager):
    def get_queryset(self):
        return super(HiringManagerManager, self).get_queryset().filter(
            type=User.Type.hiring_manager
        )


class HiringManager(User):
    token_prefix = 'hm'
    objects = HiringManagerManager()

    class Meta:
        proxy = True
        verbose_name = 'Hiring Manager'
        verbose_name_plural = 'Hiring Managers'

    def save(self, *args, **kwargs):
        self.type = User.Type.hiring_manager
        super(HiringManager, self).save(*args, **kwargs)


class Company(BaseModel, AddressFields):
    token_prefix = 'company'

    name = models.CharField(max_length=64)
    logo = models.ImageField()
