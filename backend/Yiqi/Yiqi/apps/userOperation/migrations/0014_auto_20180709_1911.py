# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-07-09 19:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userOperation', '0013_auto_20180709_1519'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedbackmodels',
            name='images',
            field=models.ImageField(blank=True, null=True, upload_to='FeedBackModels/%y/%d/1593d070f2534d1593c41f64387da4a6', verbose_name='反馈图片'),
        ),
        migrations.AlterField(
            model_name='sysmessages',
            name='sysuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sysuser_messages', to='messagess.SysUserModel', verbose_name='系统用户'),
        ),
    ]