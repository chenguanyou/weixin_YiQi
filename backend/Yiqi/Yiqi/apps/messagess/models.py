from uuid import uuid4
from datetime import datetime
from django.db import models

from users.models import UserProFile
from activity.models import ActivityModel

image_file = uuid4().hex


class SysUserModel(models.Model):
    '''
    系统消息用户
    '''
    TYPE = {
        ('0', '消息通知')
    }
    sysname = models.CharField(max_length=10, verbose_name='系统用户名称')
    sysIntroduction = models.TextField(verbose_name='系统用户简介')
    types = models.CharField(max_length=1, default='0', choices=TYPE, verbose_name='用户类型')
    images = models.ImageField(upload_to='SysUserModel/%Y/%m/{imagess}'.format(imagess=image_file), null=True,
                               blank=True, verbose_name='系统用户头像')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = '系统用户设置'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.sysname


class SysUserthemenuModel(models.Model):
    '''
    系统消息底部菜单
    '''
    sysuser = models.ForeignKey(SysUserModel, verbose_name='系统用户', related_name='sysusers')
    themenu_name = models.CharField(max_length=10, verbose_name='菜单名称')
    urls = models.CharField(max_length=255, verbose_name='小程序跳转路径')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = '系统用户菜单'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.themenu_name
