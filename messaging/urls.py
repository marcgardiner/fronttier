from django.conf.urls import url

from messaging.views import hm_invite


urlpatterns = [
    url(r'templates/hm_invite/?', hm_invite, name='messaging.hm_invite'),
]
