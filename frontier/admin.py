from django.contrib import admin


class BaseAdmin(admin.ModelAdmin):
    readonly_fields = ('token', 'created_at', 'updated_at')
    list_display = ('token', )
    search_fields = ('token', )

    def get_fieldsets(self, request, obj=None):
        meta_fields = ('disabled', 'storytime', 'metadata', 'created_at', 'updated_at')
        fieldsets = super(BaseAdmin, self).get_fieldsets(request, obj)

        for name, _dict in fieldsets:
            fields = _dict['fields']
            _dict['fields'] = filter(lambda f: f not in meta_fields, fields)

        fieldsets += (
            ('Metadata', {'fields': meta_fields}),
        )

        return fieldsets
