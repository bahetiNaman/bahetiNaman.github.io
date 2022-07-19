from rest_framework_mongoengine.serializers import DocumentSerializer

from url_shortner.models import *


class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UrlMapSerializer(DocumentSerializer):

    class Meta:
        model = UrlMap
        fields = '__all__'
