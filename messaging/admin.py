# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from frontier.admin import BaseAdmin
from messaging.models import Email


class EmailAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ('user', 'state', 'processed_at')


admin.site.register(Email, EmailAdmin)
