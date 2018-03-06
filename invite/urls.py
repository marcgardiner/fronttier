from django.conf.urls import url

from invite.views import invite


urlpatterns = [
    url(r'invite/?', invite, name='invite'),
]
