import os
from frontier.settings.env import DEV
from frontier.settings.common import *


INSIDE_DOCKER = os.environ.get('INSIDE_DOCKER')

# Environment
ENV = DEV

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'xv4pmh!3rk8rwb+kufl1@!f)o@k&ku6&%0_-s7i_v_$mjn9ey('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

REDIS_URL = 'redis://redis:6379/0' if INSIDE_DOCKER else 'redis://localhost:6379/0'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'postgres' if INSIDE_DOCKER else 'localhost',
        'PORT': '5432',
        'PASSWORD': '',
    }
}


# Cache

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': REDIS_URL,
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
        },
    }
}


# Celery

CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'


# Email

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# Storage

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
MEDIA_ROOT = os.path.join(BASE_DIR, 'static/')  # noqa
