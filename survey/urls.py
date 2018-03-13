from django.conf.urls import url

from frontier.utils import append_token
from survey.views import invite, response


urlpatterns = [
    url(r'invite/?', invite, name='survey.invite'),
    url(append_token(r'response'), response, name='survey.response'),
]
