from django.contrib import admin

from . import models


class SocialDescriptionInline(admin.StackedInline):
    model = models.SocialDescription
    extra = 0


class CabinetImageAdmin(admin.ModelAdmin):
    fields = ['owner', 'image', 'description']
    inlines = [SocialDescriptionInline]


# Register your models here.
admin.site.register(models.CabinetImage, CabinetImageAdmin)
