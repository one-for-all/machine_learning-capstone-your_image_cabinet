from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model, get_user
from django.shortcuts import reverse


def create_user(**kwargs):
    data = {
        'email': 'test@example.com',
        'password': 'password'
    }
    data.update(**kwargs)
    return get_user_model().objects.create_user(**data)


class SignupTest(APITestCase):
    def signup_user(self, **kwargs):
        data = {
            'email': 'test@example.com',
            'password': 'password',
            'confirm_password': 'password',
        }
        data.update(**kwargs)
        return self.client.post(
            reverse('api_signup'),
            data=data
        )

    def test_success(self):
        resp = self.signup_user()
        self.assertTrue(status.is_success(resp.status_code))
        user = get_user_model().objects.filter(email='test@example.com')
        self.assertTrue(user)
        email = resp.data.get('email')
        self.assertEqual(email, 'test@example.com')

    def test_fail_missing_data(self):
        resp = self.client.post(reverse('api_signup'))
        self.assertTrue(status.is_client_error(resp.status_code))
        for key in ['email', 'password', 'confirm_password']:
            self.assertIn(key, resp.data)

    def test_fail_password_not_match(self):
        resp = self.signup_user(confirm_password='different_password')
        self.assertTrue(status.is_client_error(resp.status_code))
        self.assertIn('confirm_password', resp.data)

    def test_fail_email_taken(self):
        self.signup_user()
        resp = self.signup_user()
        self.assertTrue(status.is_client_error(resp.status_code))
        self.assertIn('email', resp.data)


class SigninTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = create_user()

    def signin_user(self, **kwargs):
        data = {
            'email': 'test@example.com',
            'password': 'password'
        }
        data.update(**kwargs)
        return self.client.post(
            reverse('api_signin'),
            data=data
        )

    def test_success(self):
        resp = self.signin_user()
        self.assertTrue(status.is_success(resp.status_code))
        user = get_user(self.client)
        self.assertTrue(user.is_authenticated)
        self.assertEqual(user, self.user)

    def test_fail_not_match(self):
        resp = self.signin_user(password='wrong_password')
        self.assertTrue(status.is_client_error(resp.status_code))
        self.assertIn('password', resp.data)
        user = get_user(self.client)
        self.assertFalse(user.is_authenticated)

    def test_fail_non_existent(self):
        resp = self.signin_user(email='wrong@example.com')
        self.assertTrue(status.is_client_error(resp.status_code))
        self.assertIn('password', resp.data)
        user = get_user(self.client)
        self.assertFalse(user.is_authenticated)


class LogoutTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = create_user()

    def signin_user(self, **kwargs):
        data = {
            'email': 'test@example.com',
            'password': 'password'
        }
        data.update(**kwargs)
        return self.client.post(
            reverse('api_signin'),
            data=data
        )

    def test_success(self):
        self.signin_user()
        resp = self.client.post(reverse('api_logout'))
        self.assertTrue(status.is_success(resp.status_code))
        user = get_user(self.client)
        self.assertFalse(user.is_authenticated)

    def test_fail(self):
        resp = self.client.post(reverse('api_logout'))
        self.assertTrue(status.is_client_error(resp.status_code))

