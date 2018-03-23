# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string
from django.utils.translation import ugettext_lazy as _

from frontier.models import AddressFieldsMixin, BaseModel
from frontier.utils import token_resource


class User(BaseModel, AbstractUser, AddressFieldsMixin):
    token_prefix = 'user'

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'

    class Type(object):
        ADMINISTRATOR = 'administrator'
        REGULAR = 'regular'
        HIRING_MANAGER = 'hiring_manager'

        CHOICES = (
            (ADMINISTRATOR, 'Administrator'),
            (REGULAR, 'Regular'),
            (HIRING_MANAGER, 'Hiring Manager')
        )

    REQUIRED_FIELDS = ['username']
    REGISTRATION_FIELDS = ['first_name', 'last_name']

    type = models.CharField(choices=Type.CHOICES, max_length=16)
    username = models.CharField(max_length=64, unique=True,
                                default=get_random_string)
    email = models.EmailField(unique=True)
    company = models.ForeignKey(
        'business.Company', null=True, blank=True, on_delete=models.SET_NULL)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)

    login_link = models.ForeignKey(
        'business.LoginLink', related_name='og_users', null=True)

    def __repr__(self):
        return '<User: %s [%s]>' % (self.email, self.type)

    def is_admin(self):
        return self.type == User.Type.ADMINISTRATOR

    def is_hiring_manager(self):
        return self.type == User.Type.HIRING_MANAGER

    def is_regular_user(self):
        return self.type == User.Type.REGULAR

    def hydrated_user(self):
        if type(self) is not User:
            return self

        if self.type == User.Type.ADMINISTRATOR:
            return Administrator.objects.get(token=self.token)
        elif self.type == User.Type.REGULAR:
            return RegularUser.objects.get(token=self.token)
        elif self.type == User.Type.HIRING_MANAGER:
            return HiringManager.objects.get(token=self.token)

        raise Exception('Weird user type: %s' % self.type)

    def is_complete(self):
        for attr in User.REGISTRATION_FIELDS:
            if getattr(self, attr) is None:
                return False
        return True

    def app_resource(self):
        res = {
            'token': self.token,
            'type': self.type,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'company': getattr(self.company, 'token', None),
        }
        res.update(self.location_resource())
        return res


def create_login_link(sender, instance=None, created=False, **kwargs):
    if instance.login_link_id:
        return

    instance.login_link = LoginLink.objects.create(user=instance)
    instance.save()


class AdministratorManager(UserManager):
    def get_queryset(self):
        return super(AdministratorManager, self).get_queryset().filter(
            type=User.Type.ADMINISTRATOR
        )


class Administrator(User):
    token_prefix = 'admin'
    objects = AdministratorManager()

    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        self.type = User.Type.ADMINISTRATOR
        self.is_staff = True
        super(Administrator, self).save(*args, **kwargs)


receiver(post_save, sender=Administrator)(create_login_link)


class RegularUserManager(UserManager):
    def get_queryset(self):
        return super(RegularUserManager, self).get_queryset().filter(
            type=User.Type.REGULAR
        )


class RegularUser(User):
    token_prefix = 'user'
    objects = RegularUserManager()

    class Meta:
        proxy = True
        verbose_name = 'Regular User'
        verbose_name_plural = 'Regular Users'

    def save(self, *args, **kwargs):
        self.type = User.Type.REGULAR
        super(RegularUser, self).save(*args, **kwargs)


receiver(post_save, sender=RegularUser)(create_login_link)


class HiringManagerManager(UserManager):
    def get_queryset(self):
        return super(HiringManagerManager, self).get_queryset().filter(
            type=User.Type.HIRING_MANAGER
        )


class HiringManager(User):
    token_prefix = 'hm'
    objects = HiringManagerManager()

    class Meta:
        proxy = True
        verbose_name = 'Hiring Manager'
        verbose_name_plural = 'Hiring Managers'

    def save(self, *args, **kwargs):
        self.type = User.Type.HIRING_MANAGER
        super(HiringManager, self).save(*args, **kwargs)


receiver(post_save, sender=HiringManager)(create_login_link)


def logo_s3_path(instance, filename):
    return 'public/business/%s/%s' % (instance.token, filename)


class Company(BaseModel, AddressFieldsMixin):
    token_prefix = 'company'

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    name = models.CharField(max_length=64)
    logo = models.ImageField(upload_to=logo_s3_path, null=True, blank=True)

    def app_resource(self):
        if self.logo.name:
            logo_url = self.logo.url
        else:
            logo_url = None
        res = {
            'token': self.token,
            'name': self.name,
            'logo': logo_url,
        }
        res.update(self.location_resource())
        return res


class LoginLink(BaseModel):
    token_prefix = 'login'

    class Meta:
        verbose_name = 'Login Link'
        verbose_name_plural = 'Login Links'

    user = models.ForeignKey(User, related_name='login_links')
    survey_response = models.ForeignKey(
        'survey.SurveyResponse', related_name='survey_responses',
        null=True, blank=True)

    password = models.CharField(max_length=16, default=get_random_string)
    last_login = models.DateTimeField(null=True, blank=True)
    num_logins = models.IntegerField(default=0)

    def app_resource(self):
        if self.survey_response:
            survey_response = {
                'token': self.survey_response.token,
                'type': self.survey_response.survey.type,
            }
        else:
            survey_response = {
                'token': None
            }

        return {
            'token': self.token,
            'user': self.user.app_resource(),
            'num_logins': self.num_logins,
            'last_login': self.last_login,
            'survey_response': survey_response
        }
