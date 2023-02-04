# Generated by Django 3.1 on 2023-02-04 14:42

from django.db import migrations, models
import login_signup.models


class Migration(migrations.Migration):

    dependencies = [
        ('login_signup', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='amount_used',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='contentdetails',
            name='main_video',
            field=models.FileField(blank=True, null=True, upload_to=login_signup.models.path_and_rename_for_resume),
        ),
        migrations.AlterField(
            model_name='contentdetails',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='contentdetails',
            name='trailer',
            field=models.FileField(blank=True, null=True, upload_to=login_signup.models.path_and_rename_for_resume),
        ),
    ]
