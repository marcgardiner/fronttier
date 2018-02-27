from frontier.settings.env import DEV
from frontier.settings.common import *


# Environment
ENV = DEV

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'xv4pmh!3rk8rwb+kufl1@!f)o@k&ku6&%0_-s7i_v_$mjn9ey('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
        'PASSWORD': '',
    }
}


# Cache

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://localhost:6379/0',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
        },
    }
}