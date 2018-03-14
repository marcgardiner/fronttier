# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.shortcuts import render, redirect


def app(request):
    # Render the Angular app index.html. app.html symlinks to
    # ng_app/dist/index.html
    return render(request, 'app.html')


def assets(request):
    path = os.path.join('/static', request.path.lstrip('/'))
    return redirect(path, permanent=True)
