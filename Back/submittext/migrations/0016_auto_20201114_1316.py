# Generated by Django 3.1.2 on 2020-11-14 13:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submittext', '0015_auto_20201114_1308'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chattext',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 14, 13, 16, 16, 956899)),
        ),
    ]