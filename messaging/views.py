# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import HiringManager, Administrator, RegularUser
from frontier.decorators import restrict


@restrict()
def hm_invite(request):
    hm = HiringManager.objects.all()[0]
    return render(request, 'messaging/hm_invite.html', {
        'user': hm,
        'login_link': hm.login_link,
    })


@restrict()
def applicant_invite(request):
    user = RegularUser.objects.all()[0]
    return render(request, 'messaging/applicant_invite.html', {
        'user': user,
        'company': 'The Boring Company',
        'login_link': user.login_link,
    })


@restrict()
def exemplar_invite(request):
    user = RegularUser.objects.all()[0]
    return render(request, 'messaging/exemplar_invite.html', {
        'user': user,
        'company': 'The Boring Company',
        'hiring_manager': 'Elon',
        'login_link': user.login_link,
    })
