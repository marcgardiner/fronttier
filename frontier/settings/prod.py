import os

import dj_database_url

from frontier.settings.env import PROD
from frontier.settings.common import *


# Environment
ENV = PROD

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '019hu5c6153p%th1y!&s8&r-$c28akvoem121fubgf9-nutrq6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['frontier-web.herokuapp.com']


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
}


# Cache

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
        },
    }
}