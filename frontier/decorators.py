from functools import wraps
import json

from django.conf import settings
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.views import redirect_to_login
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import resolve_url
from django.views.decorators.http import require_http_methods


def json_view(allowed_methods=['GET', 'POST']):
    def decorator(view_fn):
        @wraps(view_fn)
        @require_http_methods(allowed_methods)
        def wrapper(request, *args, **kwargs):
            # If it's a POST request, make sure that the content type
            # is json.
            if request.method == 'POST':
                if request.META.get('CONTENT_TYPE') != 'application/json':
                    return JsonResponse({'error': 'content-type must be application/json'}, status=400)

                try:
                    data = json.loads(request.body)
                    if not isinstance(data, dict):
                        raise ValueError
                except ValueError:
                    return JsonResponse({'error': 'body must be a valid JSON object'}, status=400)

                request.json = data
            else:
                request.json = None

            # Set hydrated user
            if request.user.is_authenticated:
                request.hd_user = request.user.hydrated_user()
            else:
                request.hd_user = None

            try:
                r = view_fn(request, *args, **kwargs)
            except Http404 as e:
                r = ({'error': e.message}, 404)
            except:
                if settings.ENV.is_dev():
                    raise
                r = ({'error': 'server borked'}, 500)

            # If we don't return a tuple, assume status = OK
            if not isinstance(r, tuple):
                r = (r, 200)

            data, status = r
            if data is None:
                return HttpResponse(status=status)
            return JsonResponse(data, status=status)

        return wrapper
    return decorator


def restrict(*classes):
    def decorator(view_fn):
        @wraps(view_fn)
        def wrapper(request, *args, **kwargs):
            path = request.build_absolute_uri()
            user = request.user

            redirect = redirect_to_login(path, resolve_url(
                settings.LOGIN_URL), REDIRECT_FIELD_NAME)

            if not user.is_authenticated:
                if hasattr(request, 'json'):
                    return {
                        'error': 'user is not logged in'
                    }, 401
                else:
                    return redirect

            request.hd_user = getattr(request, 'hd_user', user.hydrated_user())
            for klass in classes:
                if isinstance(request.hd_user, klass):
                    break
            else:
                if hasattr(request, 'json'):
                    return {
                        'error': 'user is not allowed access to this endpoint'
                    }, 403
                else:
                    return redirect

            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
