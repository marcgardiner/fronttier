from django.contrib.postgres.fields import JSONField
from django.core import serializers
from django.db import models
from django.utils.crypto import get_random_string


class BaseModel(models.Model):
    class Meta:
        abstract = True


    def __init__(self, *args, **kwargs):
        if not hasattr(self.__class__, 'token_prefix'):
            raise NotImplementedError('token_prefix missing for %' % self.__class__.__name__)

        super(BaseModel, self).__init__(*args, **kwargs)

        if not self.token:
            self.token = '%s_%s' % (self.__class__.token_prefix, get_random_string(length=16))

    token = models.CharField(max_length=32, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    storytime = models.TextField(null=True)
    metadata = JSONField(null=True)

    def serialize(self):
        return serializers.serialize('json', [self])[1:-1]
