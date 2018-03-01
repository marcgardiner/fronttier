# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.shortcuts import render, redirect


def get_dist_files():
    if hasattr(get_dist_files, 'filenames'):
        return get_dist_files.filenames

    root_dir = os.path.dirname(__file__)
    dist_dir = os.path.join(root_dir, 'ng_app/dist')

    filenames = []
    for name in os.listdir(dist_dir):
        if os.path.isfile(os.path.join(dist_dir, name)):
            filenames.append(name)

    get_dist_files.filenames = set(filenames)
    return filenames


def app(request):
    _, last = os.path.split(request.path)

    # HACK(usmanm): This is a hack to redirect all Angular assets
    # to /static/
    if last in get_dist_files():
        return redirect(os.path.join('/static/', request.path.lstrip('/')), permanent=True)

    # Render the Angular app index.html. app.html symlinks to
    # ng_app/dist/index.html
    return render(request, 'app.html')
