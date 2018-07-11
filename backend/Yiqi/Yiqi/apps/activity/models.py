from uuid import uuid4
from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model

USER = get_user_model()
image_file = uuid4().hex


class ActivityTypeModel(models.Model):
    '''
    活动类别
    '''
    name = models.CharField(max_length=50, verbose_name='类别名称')
    cover_image = models.ImageField(upload_to='ActivityTypeModel/%y/%d/{image_file}'.format(image_file=image_file),
                                    null=True,
                                    blank=True, verbose_name='类别图片')
    Introduction = models.TextField(max_length=300, verbose_name='类别简介')
    indexnum = models.IntegerField(default=0, verbose_name='排列顺序')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = '活动类别管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


# Create your models here.
class ActivityModel(models.Model):
    '''
    发布活动
    '''
    AUDIT = {
        ('0', '审核中'),
        ('1', '审核通过')
    }
    user = models.ForeignKey(USER, verbose_name='用户')
    cover_image = models.ImageField(upload_to='Activity/%y/%d/{image_file}'.format(image_file=image_file), null=True,
                                    blank=True, verbose_name='封面图片')
    title = models.CharField(max_length=50, verbose_name='活动标题')
    content = models.TextField(max_length=500, verbose_name='活动内容')
    startdate = models.DateTimeField(default=datetime.now, verbose_name='开始时间')
    enddate = models.DateTimeField(default=datetime.now, verbose_name='结束时间')
    address = models.CharField(max_length=255, verbose_name='活动地点')
    latitude = models.CharField(max_length=200, verbose_name='纬度')
    longitude = models.CharField(max_length=200, verbose_name='经度')
    registration_number = models.IntegerField(default=0, verbose_name='用户报名数')
    activitytype = models.ForeignKey(ActivityTypeModel, verbose_name='活动类别', related_name='activitytype')
    limitnum = models.IntegerField(default=10, verbose_name='限制人数')
    username = models.CharField(max_length=3, verbose_name='真实姓名')
    wechat = models.CharField(max_length=20, verbose_name='微信号')
    groupcode = models.ImageField(upload_to='Activity/qr/%y/%d/{image_file}'.format(image_file=image_file), null=True,
                                  blank=True, verbose_name='群二维码')
    istrue = models.BooleanField(default=False, verbose_name='是否同意协议')
    thedraft = models.BooleanField(default=False, verbose_name='是否发布')
    audit = models.CharField(max_length=1, choices=AUDIT, default=0, verbose_name='审核状态')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='发布时间')

    class Meta:
        verbose_name = '发布活动管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class ActivityImagesModel(models.Model):
    '''
    活动图片
    '''
    activity = models.ForeignKey(ActivityModel, verbose_name='活动', related_name='activity_images')
    image = models.ImageField(upload_to='ActivityImagesModel/%y/%d/{image_file}'.format(image_file=image_file),
                              null=True,
                              blank=True, verbose_name='活动图片')
    indexnum = models.IntegerField(default=0, verbose_name='图片顺序')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='上传时间')

    class Meta:
        verbose_name = '活动图片管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.activity.title


class SlideModels(models.Model):
    '''
    首页幻灯片
    '''
    activity = models.ForeignKey(ActivityModel, verbose_name='活动')
    image = models.ImageField(upload_to='SlideModels/%y/%d/{image_file}'.format(image_file=image_file),
                              null=True,
                              blank=True, verbose_name='幻灯片图片')
    indexnum = models.IntegerField(default=0, verbose_name='幻灯片顺序')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = '幻灯片管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.activity.title
