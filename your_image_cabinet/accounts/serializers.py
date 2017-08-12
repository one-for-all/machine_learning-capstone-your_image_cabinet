from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate, login


class UserCreationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords need to match'
            })
        return data

    def validate_email(self, value):
        try:
            get_user_model().objects.get(email=value)
        except get_user_model().DoesNotExist:
            return value
        else:
            raise serializers.ValidationError('This email has been taken')

    def save(self, **kwargs):
        get_user_model().objects.create_user(
            email=self.validated_data.get('email'),
            password=self.validated_data.get('password')
        )


class UserLogInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        self.user = authenticate(
            email=data.get('email'),
            password=data.get('password')
        )
        if self.user is None:
            raise serializers.ValidationError({
                'password': 'Email and password do not match'
            })
        return data

    def save(self, **kwargs):
        login(self.context.get('request'), self.user)
