#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/10 21:12
# @User    : zhunishengrikuaile
# @File    : Serializers.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端
from rest_framework import serializers

from users.models import UserProFile

class UserRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProFile
        fields = ("name", "avatar", "gender", "password")