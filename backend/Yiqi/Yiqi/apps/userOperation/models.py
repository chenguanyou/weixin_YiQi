from uuid import uuid4
from datetime import datetime
from django.db import models

# Create your models here.
from activity.models import ActivityModel
from users.models import UserProFile
from SharingSet.models import SharingSetModel
from messagess.models import SysUserModel

image_file = uuid4().hex


class ActivityUserInfo(models.Model):
    '''
    发起人的联系信息和报名人的联系信息
    '''
    TYPE = {
        ('0', '活动发起人'),
        ('1', '活动参加人')
    }
    user = models.ForeignKey(UserProFile, verbose_name='报名用户')
    type = models.CharField(choices=TYPE, max_length=1, default='1', verbose_name='报名用户类型')
    activity = models.ForeignKey(ActivityModel, verbose_name='活动')
    username = models.CharField(max_length=3, verbose_name='真实姓名')
    wechat = models.CharField(max_length=20, verbose_name='微信号')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='报名时间')

    class Meta:
        verbose_name = '活动报名记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class SharingUserModel(models.Model):
    '''
    获取哪个用户分享了
    '''
    user = models.ForeignKey(UserProFile, verbose_name='分享用户')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='分享时间')

    class Meta:
        verbose_name = '用户分享记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.name


class CollectionUserModel(models.Model):
    '''
    用户活动收藏记录
    '''
    user = models.ForeignKey(UserProFile, verbose_name='收藏用户')
    activity = models.ForeignKey(ActivityModel, verbose_name='收藏活动', related_name='activity_dbs')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='收藏时间')

    class Meta:
        verbose_name = '用户收藏记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.name


class ReporttionUserModel(models.Model):
    '''
    用户活动举报记录
    '''
    user = models.ForeignKey(UserProFile, verbose_name='举报用户')
    activity = models.ForeignKey(ActivityModel, verbose_name='举报活动')
    contion = models.TextField(verbose_name='举报理由')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='举报时间')

    class Meta:
        verbose_name = '用户举报记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.name


class BrowseUserModel(models.Model):
    '''
    用户活动浏览记录
    '''
    user = models.ForeignKey(UserProFile, verbose_name='浏览用户')
    activity = models.ForeignKey(ActivityModel, verbose_name='浏览活动', related_name='activity_db')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='浏览时间')

    class Meta:
        verbose_name = '用户浏览记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.name


class CommentsModels(models.Model):
    '''
    用户的评论model
    '''
    user = models.ForeignKey(UserProFile, verbose_name='评论用户')
    activity = models.ForeignKey(ActivityModel, verbose_name='评论活动')
    parent_comment = models.ForeignKey('CommentsModels', blank=True, null=True, related_name='p_comment',
                                       verbose_name='父评论')
    centent = models.TextField(max_length=300, verbose_name='评论内容')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='评论时间')

    class Meta:
        verbose_name = '用户评论记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.user.name) + str(self.parent_comment)


class FeedBackModels(models.Model):
    '''
    用户意见反馈
    '''
    user = models.ForeignKey(UserProFile, verbose_name='反馈用户')
    title = models.CharField(max_length=20, verbose_name='反馈标题')
    centent = models.TextField(max_length=300, verbose_name='反馈内容')
    images = models.ImageField(upload_to='FeedBackModels/%y/%d/{image_file}'.format(image_file=image_file),
                               null=True,
                               blank=True, verbose_name='反馈图片')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='反馈时间')

    class Meta:
        verbose_name = '用户反馈记录'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class SysMessages(models.Model):
    '''
    消息内容
    '''
    ISOPEN = {
        ('0', '未读'),
        ('1', '已读')
    }
    sysuser = models.ForeignKey(SysUserModel, verbose_name='系统用户', related_name='sysuser_messages')
    user = models.ForeignKey(UserProFile, verbose_name='接收用户')
    ISOPEN = models.CharField(max_length=1, default='0', choices=ISOPEN, verbose_name='是否已读')
    activity = models.ForeignKey(ActivityModel, verbose_name='活动')
    titles = models.CharField(max_length=50, verbose_name='消息标题')
    content = models.TextField(default='消息内容')
    addtime = models.DateTimeField(default=datetime.now, verbose_name='消息时间')

    class Meta:
        verbose_name = '消息内容管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.titles
