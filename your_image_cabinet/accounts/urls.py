from django.conf.urls import url

from . import endpoints

urlpatterns = [
    url(r'api/v1/signup/', endpoints.signup, name='api_signup'),
    url(r'api/v1/signin/', endpoints.signin, name='api_signin'),
    url(r'api/v1/logout/', endpoints.logout_user, name='api_logout'),
]