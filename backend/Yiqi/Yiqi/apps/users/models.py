from uuid import uuid4
from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser  # 继承Django_AbstractUser用来扩展models

image_file = uuid4().hex


# Create your models here.

class UserProFile(AbstractUser):
    '''
    用户表
    '''
    GENDER = {
        ("1", "男"),
        ("2", "女")
    }
    openid = models.CharField(max_length=200, default='', verbose_name='用户微信唯一ID')
    avatarUrl = models.URLField(max_length=500, default='', verbose_name='用户微信头像')
    country = models.CharField(max_length=100, default='', verbose_name='用户微信国家')
    user_bh = models.CharField(max_length=50, default=uuid4().hex, unique=True, verbose_name='用户唯一ID')
    province = models.CharField(max_length=100, default='', verbose_name='用户微信城市')
    city = models.CharField(max_length=100, default='', verbose_name='用户微信区域')
    language = models.CharField(max_length=100, default='', verbose_name='用户微信语言')
    background = models.ImageField(upload_to='UserProFilebg/%Y/%m/{imagess}'.format(imagess=image_file), null=True,
                                   blank=True,
                                   default='/default/default.jpg',
                                   verbose_name='背景图')
    nickName = models.CharField(max_length=20, verbose_name="微信用户名")
    name = models.CharField(max_length=20, verbose_name="用户名")
    birthay = models.DateField(default=datetime.now, verbose_name="出生日期")
    avatar = models.ImageField(upload_to='UserProFilebg/avatar/%y/%d/{image_file}'.format(image_file=image_file), null=True,
                               blank=True)
    mobile = models.CharField(max_length=11, null=True, blank=True, verbose_name="手机号")
    gender = models.CharField(max_length=10, choices=GENDER, default="1",
                              verbose_name="性别")
    thesignature = models.TextField(max_length=200, default='世界为你转身，因为你肯冒险！', verbose_name='用户签名')
    agreement = models.BooleanField(default=False, verbose_name='是否阅读协议')
    email = models.EmailField(max_length=100, null=True, blank=True, verbose_name="邮箱")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="注册时间")

    class Meta:
        verbose_name = '用户管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name
