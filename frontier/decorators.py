from functools import wraps
import json

from django.http import HttpResponse, JsonResponse
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
            
            r = view_fn(request, *args, **kwargs)

            # If we don't return a tuple, assume status = OK
            if not isinstance(r, tuple):
                r = (r, 200)

            data, status = r
            if data is None:
                return HttpResponse(status=status)
            return JsonResponse(data, status=status)

        return wrapper
    return decorator
