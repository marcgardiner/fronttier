import datetime
import os

from django.forms import ModelForm
from django.http import Http404
from django.utils.timezone import is_aware


def token_resource(obj):
    return {'token': getattr(obj, 'token', None)}


TOKEN_REGEX = r'(?P<token>[a-z]+_[0-9a-zA-Z_]+)/?'


def append_token(path):
    return os.path.join(path, TOKEN_REGEX)


class Http403(Exception):
    pass


class Http400(Exception):
    pass


class Http401(Exception):
    pass


def get_or_4xx(klass, token, user=None):
    try:
        obj = klass.objects.get(token=token, disabled=False)
    except klass.DoesNotExist:
        raise Http404('%s does not exist' % token)

    if not user or user.is_admin() or obj.has_access(user):
        return obj

    raise Http403('%s access is forbidden')


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


def collect_values(d, key):
    values = []
    for k, v in d.iteritems():
        if isinstance(v, dict):
            values.extend(collect_values(v, key))
            continue
        if isinstance(v, list):
            for e in v:
                if isinstance(e, dict):
                    values.extend(collect_values(e, key))
        if k != key:
            continue
        values.append(v)
    return values
