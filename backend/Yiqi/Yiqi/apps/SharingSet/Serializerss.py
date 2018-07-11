#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/4 10:39
# @User    : zhunishengrikuaile
# @File    : Serializerss.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端
from rest_framework import serializers

from SharingSet.models import SharingSetModel

class SharingSerializers(serializers.ModelSerializer):
    '''
    获取分享数据
    '''
    class Meta:
        model = SharingSetModel
        fields = '__all__'