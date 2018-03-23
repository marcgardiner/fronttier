class HydratedUserMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            request.user = request.user.hydrated_user()

        return self.get_response(request)
