from django.conf.urls import url

from web.views import app, assets

urlpatterns = [
    url(r'assets/.*$', assets, name='web.assets'),
    url(r'$', app, name='web.app'),
]
