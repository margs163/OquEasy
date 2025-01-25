from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
 
	def validate(self, data):
		if User.objects.filter(email=data['email']).exists():
		    raise serializers.ValidationError("A user with this email already exists.")
		return data
 
	def create(self, validated_data):
		user = UserModel.objects.create_user(
			username=validated_data['email'],
			password=validated_data['password'],
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name'],
			email=validated_data['email'],
		)

		return user
 	
	class Meta:
		model = UserModel
		fields = ("first_name", "last_name", "email", "password")


class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    
class ResetPasswordSerializer(serializers.Serializer):
	new_password = serializers.RegexField(
		regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
		write_only=True,
		error_messages={'invalid': ('Password must be at least 8 characters long with at least one capital letter and symbol')}
  	)
	confirm_password = serializers.CharField(write_only=True, required=True)