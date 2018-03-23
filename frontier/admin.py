from django.contrib import admin
from django.contrib.postgres.fields import JSONField
from prettyjson import PrettyJSONWidget


class BaseAdmin(admin.ModelAdmin):
    readonly_fields = ('token', 'created_at', 'updated_at')
    list_display = ('token', )
    search_fields = ('token', )

    formfield_overrides = {
        JSONField: {'widget': PrettyJSONWidget}
    }

    META_FIELDS = set(['disabled', 'storytime', 'metadata',
                       'created_at', 'updated_at'])
    LOCATION_FIELDS = set(['address1', 'address2', 'postal_code',
                           'phone_number', 'city', 'state', 'country'])
    SKIP_FIELDS = META_FIELDS.union(LOCATION_FIELDS)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super(BaseAdmin, self).get_fieldsets(request, obj)

        location_fields = []
        for name, _dict in fieldsets:
            fields = _dict['fields']
            location_fields = filter(
                lambda f: f in BaseAdmin.LOCATION_FIELDS, fields)
            _dict['fields'] = filter(
                lambda f: f not in BaseAdmin.SKIP_FIELDS, fields)

        fieldsets += (
            ('Location', {'fields': location_fields}),
            ('Metadata', {'fields': BaseAdmin.META_FIELDS}),
        )

        return fieldsets
