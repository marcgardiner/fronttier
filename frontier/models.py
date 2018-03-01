import json

from django.contrib.postgres.fields import JSONField
from django.core import serializers
from django.db import models
from django.utils.crypto import get_random_string
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField


class BaseModel(models.Model):
    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        if not hasattr(self.__class__, 'token_prefix'):
            raise NotImplementedError('token_prefix missing for %s' % self.__class__.__name__)

        super(BaseModel, self).__init__(*args, **kwargs)
        self.set_token()

    token = models.CharField(max_length=32, unique=True, default=get_random_string)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    disabled = models.BooleanField(default=False, db_index=True)

    storytime = models.TextField(null=True, blank=True)
    metadata = JSONField(null=True, blank=True)

    def set_token(self):
        if not self.token or '_' not in self.token:
            self.token = '%s_%s' % (self.__class__.token_prefix, get_random_string(length=16))

    def save(self, *args, **kwargs):
        self.set_token()
        super(BaseModel, self).save(*args, **kwargs)

    def serialize(self, fields=None):
        return json.loads(serializers.serialize('json', [self], fields=fields))[0]

    @classmethod
    def load(cls, token, safe=False):
        try:
            return cls.objects.get(token=token)
        except cls.DoesNotExist:
            if not safe:
                raise


class LocationFields(object):
    city = models.CharField(max_length=128, null=True, blank=True)
    state = models.CharField(max_length=128, null=True, blank=True)
    country = CountryField(null=True, blank=True)


class AddressFields(LocationFields):
    address1 = models.TextField(null=True, blank=True)
    address2 = models.TextField(null=True, blank=True)
    postal_code = models.CharField(null=True, blank=True, max_length=16)

    phone_number = PhoneNumberField(null=True, blank=True)