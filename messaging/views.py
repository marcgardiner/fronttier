# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from business.models import HiringManager, Administrator, Applicant
from frontier.decorators import restrict


@restrict(Administrator)
def hm_invite(request):
    hm = HiringManager.objects.all()[0]
    return render(request, 'messaging/hm_invite.html', {
        'user': hm,
        'login_link': hm.login_link,
    })


@restrict(Administrator)
def candidate_invite(request):
    applicant = Applicant.objects.all()[0]
    return render(request, 'messaging/candidate_invite.html', {
        'user': applicant,
        'company': 'The Boring Company',
        'login_link': applicant.login_link,
    })


@restrict(Administrator)
def exemplar_invite(request):
    applicant = Applicant.objects.all()[0]
    return render(request, 'messaging/exemplar_invite.html', {
        'user': applicant,
        'company': 'The Boring Company',
        'hiring_manager': 'Elon',
        'login_link': applicant.login_link,
    })
