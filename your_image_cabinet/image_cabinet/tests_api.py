from rest_framework.test import APITestCase
from django.conf import settings
from django.shortcuts import reverse
from django.contrib.auth import get_user_model
from rest_framework.status import is_success, is_client_error
import os

from . import models


class ImageStreamTest(APITestCase):
    fixtures = ['fixture_0001.json']

    def test_success(self):
        resp = self.client.get(reverse('api_image_stream'))
        self.assertTrue(is_success(resp.status_code))
        self.assertIn('images', resp.data)

    def test_exclude_user(self):
        user = get_user_model().objects.order_by('?').first()
        image = models.CabinetImage.objects.order_by('?').first()
        models.SocialDescription.objects.create(
            text='random description',
            image=image,
            describer=user
        )
        self.client.force_login(user)
        resp = self.client.get(reverse('api_image_stream'))
        self.assertTrue(is_success(resp.status_code))
        image_ids = [image.get('id') for image in resp.data.get('images')]
        self.assertNotIn(image.id, image_ids)

    def test_get_all(self):
        user = get_user_model().objects.order_by('?').first()
        image = models.CabinetImage.objects.order_by('?').first()
        models.SocialDescription.objects.create(
            text='random description',
            image=image,
            describer=user
        )
        self.client.force_login(user)
        resp = self.client.get(reverse('api_image_stream'), data={'all': ''})
        self.assertTrue(is_success(resp.status_code))
        image_ids = [image.get('id') for image in resp.data.get('images')]
        self.assertIn(image.id, image_ids)


class ImageCabinetTest(APITestCase):
    fixtures = ['fixture_0001.json']

    def test_success(self):
        user = get_user_model().objects.order_by('?').first()
        self.client.force_login(user)
        resp = self.client.get(reverse('api_image_cabinet'))
        self.assertTrue(is_success(resp.status_code))
        images = resp.data.get('images')
        for image in images:
            self.assertEqual(image.get('owner'), user.pk)

    def test_fail_unauthenticated(self):
        resp = self.client.get(reverse('api_image_cabinet'))
        self.assertTrue(is_client_error(resp.status_code))
        self.assertNotIn('images', resp.data)


class SocialDescriptionTest(APITestCase):
    fixtures = ['fixture_0001.json']

    def test_success(self):
        user = get_user_model().objects.order_by('?').first()
        image = models.CabinetImage.objects.order_by('?').first()
        self.client.force_login(user)
        text = 'I cannot see it'
        resp = self.client.post(reverse('api_describe_image'), {
            'text': text,
            'image': image.id
        })
        self.assertTrue(is_success(resp.status_code))
        description = models.SocialDescription.objects.filter(image=image,
                                                              text=text).get()
        self.assertEqual(user, description.describer)

    def test_fail_unauthenticated(self):
        image = models.CabinetImage.objects.order_by('?').first()
        resp = self.client.post(reverse('api_describe_image'), {
            'text': 'I cannot see it',
            'image': image.id
        })
        self.assertTrue(is_client_error(resp.status_code))


# class ImageUploadTest(APITestCase):
#     @classmethod
#     def setUpTestData(cls):
#         cls.user = get_user_model().objects.create_user(
#             email='test@example.com',
#             password='password'
#         )
#
#     def test_success_authenticated(self):
#         self.client.force_login(self.user)
#         img_path = os.path.join(settings.BASE_DIR, 'test_images/ape.jpg')
#         with open(img_path, 'rb') as fp:
#             resp = self.client.post(reverse('api_image_upload'), {
#                 'image': fp
#             })
#             self.assertTrue(is_success(resp.status_code))
#             self.assertIn('description', resp.data)
#             print(resp.data.get('description'))
#
#     def test_success_unauthenticated(self):
#         img_path = os.path.join(settings.BASE_DIR, 'test_images/ape.jpg')
#         with open(img_path, 'rb') as fp:
#             resp = self.client.post(reverse('api_image_upload'), {
#                 'image': fp
#             })
#             self.assertTrue(is_success(resp.status_code))
#             self.assertIn('description', resp.data)
#             print(resp.data.get('description'))
