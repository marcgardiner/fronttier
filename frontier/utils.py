import os

from django.http import Http404


TOKEN_REGEX = r'(?P<token>[a-z]+_[0-9a-zA-Z_]+)/?'


def append_token(path):
    return os.path.join(path, TOKEN_REGEX)


def get_or_404(klass, token):
    try:
        return klass.objects.get(token=token, disabled=False)
    except klass.DoesNotExist:
        raise Http404
