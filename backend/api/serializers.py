from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title", "content","created_at", "author"]
        extra_kwargs = {"author": {"write_only": True}}