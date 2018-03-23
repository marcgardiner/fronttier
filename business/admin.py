# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django_object_actions import DjangoObjectActions

from business.models import Administrator, RegularUser, HiringManager, Company, LoginLink
from frontier.admin import BaseAdmin
from messaging.models import Email


class BaseUserAdmin(DjangoObjectActions, UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('token', )

    add_fieldsets = UserAdmin.add_fieldsets + \
        (('Personal', {'fields': ('first_name', 'last_name', 'email')}), )


user_fieldsets = [
    ('Credentials', {'fields': ('token', )}),
]
for fieldset in UserAdmin.fieldsets:
    name, meta = fieldset
    if name == 'Permissions':
        continue
    user_fieldsets.append(fieldset)
user_fieldsets = tuple(user_fieldsets) + (
    ('Active', {'fields': ('is_active', )}),
)


class AdministratorAdmin(BaseUserAdmin):
    readonly_fields = BaseUserAdmin.readonly_fields + (
        'is_superuser', 'is_staff')

    fieldsets = user_fieldsets + (
        ('SU Bits', {'fields': ('is_superuser', 'is_staff')}),
    )


class RegularUserAdmin(BaseUserAdmin):
    fieldsets = user_fieldsets


class HiringManagerAdmin(BaseUserAdmin):
    fieldsets = user_fieldsets
    change_actions = ('send_invite', )

    def send_invite(self, request, obj):
        email = Email.objects.create(
            user=obj,
            template='messaging/hm_invite.html',
            context={
                'subject': 'Welcome to Frontier Signal',
            }
        )

    send_invite.label = 'Send Invitation Email'


class LoginLinkAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('user', 'survey_response')
    readonly_fields = BaseAdmin.readonly_fields + ('last_login', 'num_logins')


class CompanyAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('name', )


admin.site.register(Administrator, AdministratorAdmin)
admin.site.register(RegularUser, RegularUserAdmin)
admin.site.register(HiringManager, HiringManagerAdmin)
admin.site.register(LoginLink, LoginLinkAdmin)
admin.site.register(Company, CompanyAdmin)
