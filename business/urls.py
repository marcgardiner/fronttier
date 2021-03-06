from django.conf.urls import url

from business.views import login, logout, login_link, companies, me, company
from frontier.utils import append_token


urlpatterns = [
    url(append_token(r'login'), login_link, name='business.login_link'),
    url(r'login/?', login, name='business.login'),
    url(r'logout/?', logout, name='business.logout'),
    url(r'me/?', me, name='business.me'),

    url(append_token(r'company'), company, name='business.company'),
    url(r'company/?', companies, name='business.companies'),
]
