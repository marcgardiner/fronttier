from django.conf.urls import url

from frontier.utils import append_token
from survey.views import invite, response, jobs, job


urlpatterns = [
    url(r'invite/?', invite, name='survey.invite'),

    url(append_token(r'job'), job, name='survey.job'),
    url(r'job/?', jobs, name='survey.jobs'),

    url(append_token(r'response'), response, name='survey.response'),
]
