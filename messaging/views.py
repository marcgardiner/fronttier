# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import HiringManager, Administrator
from frontier.decorators import restrict


@restrict(Administrator)
def hm_invite(request):
    hm = HiringManager.objects.all()[0]
    return render(request, 'messaging/hm_invite.html', {
        'user': hm,
        'login_link': hm.login_link,
    })
