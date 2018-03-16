from django.conf.urls import url

from messaging.views import hm_invite, applicant_invite, exemplar_invite


urlpatterns = [
    url(r'templates/hm_invite/?', hm_invite, name='messaging.hm_invite'),
    url(r'templates/applicant_invite/?', applicant_invite,
        name='messaging.canidate_invite'),
    url(r'templates/exemplar_invite/?', exemplar_invite,
        name='messaging.exemplar_invite'),
]
