from django.conf import settings


from business.models import User
from frontier.utils import get_or_4xx


class HydratedUserMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            request.user = request.user.hydrated_user()
        elif settings.ENV.is_dev():
            token = request.META.get('HTTP_X_USER')
            if token:
                request.user = get_or_4xx(User, token).hydrated_user()

        return self.get_response(request)
