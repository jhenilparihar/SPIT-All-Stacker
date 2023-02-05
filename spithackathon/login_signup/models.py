from django.db import models
from django.contrib.auth.models import User
import os

# Create your models here.
def path_and_rename_for_resume(instance, filename):
    return os.path.join('streamit_'+filename)


class Profile(models.Model):
	user = models.ForeignKey(User, related_name = 'profiledetails', on_delete=models.CASCADE) 

	profile_pic = models.ImageField(null=True,blank=True)

	interests = models.TextField(null=True,blank=True)
	created_nft =  models.TextField(null=True,blank=True)
	description = models.TextField(null=True,blank=True)
	account_address = models.TextField(null=True,blank=True)
	amount_used =  models.TextField(null=True,blank=True)
	date_of_joining = models.TextField(null=True,blank=True)
	category = models.TextField(null=True,blank=True)
	collections = models.TextField(null=True,blank=True)



	def __str__(self):
		return self.user


class contentdetails(models.Model):
	title = models.TextField(null=True,blank=True)
	description =  models.TextField(null=True,blank=True)
	price = models.TextField(null=True,blank=True)
	duration = models.TextField(null=True,blank=True)
	category =  models.TextField(null=True,blank=True)
	rate = models.TextField(null=True,blank=True)
	review = models.TextField(null=True,blank=True)
	tags = models.TextField(null=True,blank=True)
	adult_rate = models.TextField(null=True,blank=True)
	adult_type = models.TextField(null=True,blank=True)
	thumbnail =  models.ImageField(null=True,blank=True)
	trailer = models.FileField(upload_to=path_and_rename_for_resume,null=True,blank=True)
	main_video = models.FileField(upload_to=path_and_rename_for_resume,null=True,blank=True)
	rating = models.TextField(null=True,blank=True)


class contentrating(models.Model):
	content =  models.ForeignKey(contentdetails, related_name = 'contentdetails', on_delete=models.CASCADE) 
	user 	= models.ForeignKey(User, related_name = 'userdetails',on_delete=models.CASCADE)
	rating  = models.TextField(blank=True, max_length=255)

