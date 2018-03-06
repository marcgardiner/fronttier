# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from business.models import Administrator, Applicant, HiringManager, Company, LoginLink
from frontier.admin import BaseAdmin


class BaseUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')

    add_fieldsets = UserAdmin.add_fieldsets + \
        (('Personal', {'fields': ('first_name', 'last_name', 'email')}), )


user_fieldsets = []
for fieldset in UserAdmin.fieldsets:
    name, meta = fieldset
    if name == 'Permissions':
        continue
    user_fieldsets.append(fieldset)
user_fieldsets = tuple(user_fieldsets) + (
    ('Active', {'fields': ('is_active', )}),
)


class AdministratorAdmin(BaseUserAdmin):
    readonly_fields = ('is_superuser', 'is_staff')

    fieldsets = user_fieldsets + (
        ('SU Bits', {'fields': ('is_superuser', 'is_staff')}),
    )


class ApplicantAdmin(BaseUserAdmin):
    fieldsets = user_fieldsets


class HiringManagerAdmin(BaseUserAdmin):
    fieldsets = user_fieldsets


class LoginLinkAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('user', 'survey_response')
    readonly_fields = BaseAdmin.readonly_fields + ('last_login', 'num_logins', 'user', 'survey_response')


class CompanyAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('name', )
    readonly_fields = BaseAdmin.readonly_fields + ('name', )


admin.site.register(Administrator, AdministratorAdmin)
admin.site.register(Applicant, ApplicantAdmin)
admin.site.register(HiringManager, HiringManagerAdmin)
admin.site.register(LoginLink, LoginLinkAdmin)
admin.site.register(Company, CompanyAdmin)
