import json

from django.contrib.postgres.fields import JSONField
from django.core import serializers
from django.db import models
from django.forms import ModelForm
from django.utils.crypto import get_random_string
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from frontier.utils import get_or_4xx


class BaseModel(models.Model):
    def __init__(self, *args, **kwargs):
        if not hasattr(self.__class__, 'token_prefix'):
            raise NotImplementedError('token_prefix missing for %s' %
                                      self.__class__.__name__)

        super(BaseModel, self).__init__(*args, **kwargs)
        self.set_token()

    token = models.CharField(max_length=64, unique=True,
                             default=get_random_string)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    disabled = models.BooleanField(default=False, db_index=True)

    storytime = models.TextField(null=True, blank=True)
    metadata = JSONField(null=True, blank=True)

    class Meta:
        abstract = True

    def set_token(self):
        if not self.token or '_' not in self.token:
            self.token = '%s_%s' % (
                self.__class__.token_prefix, get_random_string(length=16))

    def validate(self):
        pass

    def save(self, *args, **kwargs):
        self.set_token()
        super(BaseModel, self).save(*args, **kwargs)

    def serialize(self, fields=None):
        return json.loads(serializers.serialize('json', [self], fields=fields))[0]

    def __repr__(self):
        return '<%s: %s>' % (self.__class__.__name__, self.token)

    def __unicode__(self):
        return repr(self)

    def app_resource(self):
        return {
            'token': self.token,
        }

    @classmethod
    def load(cls, token, safe=False):
        try:
            return cls.objects.get(token=token)
        except cls.DoesNotExist:
            if not safe:
                raise

    @classmethod
    def clean_form_data(cls, data):
        return data

    def has_access(self, user):
        return True


def BaseModelForm(model_cls, fields=None, exclude=[], token_fields={}):
    ex = exclude
    ex.extend(['token'])
    f = fields

    class BaseModelFormImpl(ModelForm):
        class Meta:
            model = model_cls
            fields = f
            exclude = ex

        def __init__(self, data, *args, **kwargs):
            for key, value in data.items():
                if key not in token_fields:
                    continue
                klass = token_fields[key]
                if isinstance(value, list):
                    data[key] = [get_or_4xx(klass, t).pk for t in value]
                else:
                    data[key] = get_or_4xx(klass, value).pk

            super(BaseModelFormImpl, self).__init__(data, *args, **kwargs)

            # If there is any initial data present, use that as the fallback
            # value.
            data = self.initial.copy()
            data.update(self.data)
            self.data = data

        def clean(self):
            model_cls.clean_form_data(self.cleaned_data)

    return BaseModelFormImpl


class LocationFieldsMixin(models.Model):
    city = models.CharField(max_length=128, null=True, blank=True)
    state = models.CharField(max_length=128, null=True, blank=True)
    country = CountryField(null=True, blank=True)

    class Meta:
        abstract = True

    def location_resource(self):
        return {
            'city': self.city,
            'state': self.state,
            'country': self.country.code,
        }


class AddressFieldsMixin(LocationFieldsMixin):
    address1 = models.TextField(null=True, blank=True)
    address2 = models.TextField(null=True, blank=True)
    postal_code = models.CharField(null=True, blank=True, max_length=16)

    phone_number = PhoneNumberField(null=True, blank=True)

    class Meta:
        abstract = True

    def location_resource(self):
        res = super(AddressFieldsMixin, self).location_resource()
        res.update({
            'address1': self.address1,
            'address2': self.address2,
            'postal_code': self.postal_code,
            'phone_number': self.phone_number,
        })
        return res
