# Generated by Django 3.1.2 on 2020-11-12 17:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submittext', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chattext',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 12, 20, 46, 30, 519446)),
        ),
    ]
