#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/7 02:29
# @User    : zhunishengrikuaile
# @File    : Serializers.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端

import datetime
from rest_framework import serializers

from activity.models import ActivityModel
from Yiqi.settings import IMAGES_URL
from userOperation.models import ActivityUserInfo, CommentsModels, BrowseUserModel, CollectionUserModel

now = datetime.datetime.now()
start = now - datetime.timedelta(hours=23, minutes=59, seconds=59)

class RegisteredUserSerializers(serializers.ModelSerializer):
    '''
    获取每个活动下面报名的用户, 如果当前查看的用户已经报名就显示用户名和微信号
    '''
    user = serializers.SerializerMethodField(read_only=True)  # 获取用户
    username = serializers.SerializerMethodField(read_only=True)  # 获取报名的用户名
    wechat = serializers.SerializerMethodField(read_only=True)  # 获取已经报名的用户微信
    type = serializers.SerializerMethodField(read_only=True)

    def get_type(self, obj):
        '''
        报名人员还是发起人员
        :param obj:
        :return:
        '''
        if obj.type == '0':
            return '活动发起人'
        else:
            return '活动参加人'

    def get_username(self, obj):
        '''
        获取用户报名的名字，如果访问的用户没有报名就不能显示
        :param obj:
        :return:
        '''
        this_user = self.context['user']
        id = self.context['id']
        register = ActivityUserInfo.objects.filter(user=this_user, activity__id=id)
        if register:
            return obj.username
        else:
            return '仅限报名成员查看'

    def get_wechat(self, obj):
        '''
        获取用户报名的微信，如果访问的用户没有帮忙微信就不会显示
        :param obj:
        :return:
        '''
        this_user = self.context['user']
        id = self.context['id']
        register = ActivityUserInfo.objects.filter(user=this_user, activity__id=id)
        if register:
            return obj.wechat
        else:
            return '仅限报名成员查看'

    def get_user(self, obj):
        '''
        返回用户的头像和名称，性别
        :param obj:
        :return:
        '''
        if obj.user.thesignature:
            thesignature = obj.user.thesignature
        else:
            thesignature = '还没有设置签名。'
        return {'avatar': IMAGES_URL + 'upload/' + str(obj.user.avatar), 'name': obj.user.name,
                'gender': obj.user.gender, 'thesignature': thesignature}

    class Meta:
        model = ActivityUserInfo
        fields = '__all__'


class CommentSerializers0(serializers.ModelSerializer):
    '''
    获取当前活动的全部评论数据
    '''
    user = serializers.SerializerMethodField(read_only=True)
    addtime = serializers.DateTimeField(read_only=True, format=("%Y-%m-%d %H:%M"))

    def get_user(self, obj):
        '''
        返回用户的头像和名称，性别
        :param obj:
        :return:
        '''
        return {'avatar': IMAGES_URL + 'upload/' + str(obj.user.avatar), 'name': obj.user.name,
                'gender': obj.user.gender}

    class Meta:
        model = CommentsModels
        fields = '__all__'


class UserAllActivitySerializers(serializers.ModelSerializer):
    '''
    获取当前用户发布的活动
    '''

    judgeStartEnd = serializers.SerializerMethodField(read_only=True)

    def get_judgeStartEnd(self, obj):
        if obj.enddate >= start:
            return True
        else:
            return False

    class Meta:
        model = ActivityModel
        fields = '__all__'


class UserbrowseSerializers(serializers.ModelSerializer):
    '''
    获取当前用户的浏览记录
    '''
    activity = UserAllActivitySerializers()

    class Meta:
        model = BrowseUserModel
        fields = '__all__'


class CollectionUserSerializers(serializers.ModelSerializer):
    '''
    获取当前用户的收藏记录
    '''
    activity = UserAllActivitySerializers()

    class Meta:
        model = CollectionUserModel
        fields = '__all__'


class ActivityUserInfoSerializers(serializers.ModelSerializer):
    '''
    获取当前用户的报名记录
    '''
    activity = UserAllActivitySerializers()

    class Meta:
        model = ActivityUserInfo
        fields = '__all__'


class CommentSerializers(serializers.ModelSerializer):
    '''
    获取当前活动的全部评论数据
    '''
    # p_comment = CommentSerializers0(many=True, read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)
    addtime = serializers.DateTimeField(read_only=True, format=("%Y-%m-%d %H:%M"))

    def get_user_id(self, obj):
        '''
        返回用户的头像和名称，性别
        :param obj:
        :return:
        '''
        return {'avatar': IMAGES_URL + 'upload/' + str(obj.user.avatar), 'name': obj.user.name,
                'gender': obj.user.gender}

    class Meta:
        model = CommentsModels
        fields = '__all__'
