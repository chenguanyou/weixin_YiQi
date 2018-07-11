from uuid import uuid4
from datetime import datetime
from django.db import models

from django.contrib.auth import get_user_model

USER = get_user_model()
image_file = uuid4().hex


# Create your models here.
class SharingSetModel(models.Model):
    '''
    设置分享数据，图片和文章
    '''
    SET_PATH = {
        ('0', '通用页面'),
        ('1', '活动页面'),
        ('2', '发布页面'),
        ('3', '发现页面'),
        ('4', '消息页面'),
        ('5', '内容页面'),
    }
    set_path = models.CharField(max_length=1, choices=SET_PATH, default='0', verbose_name='分享页面设置')
    title = models.CharField(max_length=50, verbose_name='分享文字')
    imageUrl = models.ImageField(upload_to='SharingSet/%y/%d/{image_file}'.format(image_file=image_file),
                                 null=True,
                                 blank=True, verbose_name='分享图片')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = '分享页面设置'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.set_path
