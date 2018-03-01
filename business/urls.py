from django.conf.urls import url

from business.views import login, logout
from frontier.utils import append_token


urlpatterns = [
    url(append_token(r'login'), login, name='business.login'),
    url(r'logout/?', logout, name='business.logout'),
]
