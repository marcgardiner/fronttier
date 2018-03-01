import datetime
import os

from django.http import Http404
from django.utils.timezone import is_aware


TOKEN_REGEX = r'(?P<token>[a-z]+_[0-9a-zA-Z_]+)/?'


def append_token(path):
    return os.path.join(path, TOKEN_REGEX)


def get_or_404(klass, token):
    try:
        return klass.objects.get(token=token, disabled=False)
    except klass.DoesNotExist:
        raise Http404


def serialize_datetime(o):
    if isinstance(o, datetime.datetime):
        r = o.isoformat()
        if o.microsecond:
            r = r[:23] + r[26:]
        if r.endswith('+00:00'):
            r = r[:-6] + 'Z'
        return r
    elif isinstance(o, datetime.date):
        return o.isoformat()
    elif isinstance(o, datetime.time):
        if is_aware(o):
            raise ValueError("JSON can't represent timezone-aware times.")
        r = o.isoformat()
        if o.microsecond:
            r = r[:12]
        return r
    else:
        raise ValueError('Object is not of a timestamp like type.')