from django.conf.urls import url

from web.views import app

urlpatterns = [
    url(r'.*$', app, name='web.app'),
]
