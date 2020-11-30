# Generated by Django 3.1.2 on 2020-11-25 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registeration', '0016_user_numberofchatrooms'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cvfile',
            field=models.FileField(null=True, upload_to='profile/cv'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.FileField(default='profile/image/text.txt', upload_to='profile_image'),
        ),
    ]