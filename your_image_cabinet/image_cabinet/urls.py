from django.conf.urls import url

from . import endpoints


urlpatterns = [
    url(r'api/v1/image_stream/', endpoints.image_stream,
        name='api_image_stream'),
    url(r'api/v1/image_cabinet/', endpoints.image_cabinet,
        name='api_image_cabinet'),
    url(r'api/v1/image_upload/', endpoints.image_upload,
        name='api_image_upload'),
    url(r'api/v1/describe_image/', endpoints.describe_image,
        name='api_describe_image')
]