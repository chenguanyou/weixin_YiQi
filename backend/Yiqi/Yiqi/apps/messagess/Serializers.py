#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/9 15:03
# @User    : zhunishengrikuaile
# @File    : Serializers.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端
from rest_framework import serializers

from userOperation.models import SysMessages
from activity.serializers import SearchAllSerializers
from messagess.models import SysUserModel, SysUserthemenuModel


class SysUserthemenuSerializers(serializers.ModelSerializer):
    '''
    获取菜单
    '''

    class Meta:
        model = SysUserthemenuModel
        fields = '__all__'


class SysyUserSerializers(serializers.ModelSerializer):
    '''
    获取系统用户
    '''
    sysusers = SysUserthemenuSerializers(many=True)
    sysmessages = serializers.SerializerMethodField(read_only=True)
    # sysuser_messages = SysuserMessagesSerializers(many=True)

    def get_sysmessages(self, obj):
        user = self.context['request'].user
        sysmessage = SysMessages.objects.filter(sysuser__id=obj.id, user=user, ISOPEN='0').order_by('-addtime')
        if sysmessage:
            return {'message_text': sysmessage[0].titles, 'message_len': len(sysmessage)}
        else:
            return {'message_text': '还没有最新消息', 'message_len': 0}

    class Meta:
        model = SysUserModel
        fields = '__all__'


class SysuserMessagesSerializers(serializers.ModelSerializer):
    '''
    获取当前消息的全部聊天内容
    '''
    activity = SearchAllSerializers()
    addtime = serializers.DateTimeField(read_only=True, format=("%Y-%m-%d %H:%M"))
    sysuser = SysyUserSerializers()

    class Meta:
        model = SysMessages
        fields = '__all__'