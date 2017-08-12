from django.db import models
from django.conf import settings


class CabinetImage(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='images')
    image = models.ImageField(upload_to='cabinet/images')
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return "{} by {}".format(self.description, self.owner)


class SocialDescription(models.Model):
    text = models.TextField()
    image = models.ForeignKey(CabinetImage, related_name='social_descriptions')
    describer = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  related_name='social_descriptions')

    def __str__(self):
        return self.text
