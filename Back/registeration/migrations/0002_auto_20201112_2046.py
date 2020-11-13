# Generated by Django 3.1.2 on 2020-11-12 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registeration', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='description',
            field=models.TextField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='fileField',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='onlineTime',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=30, null=True),
        ),
    ]