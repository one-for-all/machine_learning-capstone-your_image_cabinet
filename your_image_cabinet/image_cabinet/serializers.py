from rest_framework import serializers
from django.conf import settings
import os

from . import models
from scripts import describe_images
from scripts import models as scripts_models


class CabinetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CabinetImage
        fields = ['owner', 'image', 'description', 'id']
        extra_kwargs = {
            'description': {'read_only': True},
            'id': {'read_only': True}
        }

    def create(self, validated_data):
        cabinet_image = super().create(validated_data)
        full_path = os.path.join(settings.MEDIA_ROOT,
                                 str(cabinet_image.image))
        cabinet_image.description = describe_images.describe(full_path)
        cabinet_image.save()
        # scripts_image, _ = scripts_models.Image.get_or_create(
        #     index=cabinet_image.id,
        # )
        # scripts_image.url = str(cabinet_image.image)
        # scripts_image.save()
        return cabinet_image


class SocialDescription(serializers.ModelSerializer):
    class Meta:
        model = models.SocialDescription
        fields = ['text', 'image', 'describer', 'id']
        extra_kwargs = {
            'id': {'read_only': True},
            'describer': {'read_only': True}
        }

    def create(self, validated_data):
        describer = self.context.get('user')
        social_description = models.SocialDescription.objects.create(
            text=validated_data.get('text'),
            image=validated_data.get('image'),
            describer=describer
        )
        return social_description
