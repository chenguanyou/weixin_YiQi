#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/1 00:49
# @User    : zhunishengrikuaile
# @File    : adminx.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端
import xadmin
from SharingSet.models import SharingSetModel


class SharingSetModelAdmin(object):
    list_display = ["set_path", "title", "addtime"]  # 后台显示类型
    search_fields = ["set_path", "title", "addtime"]  # 设置搜索
    list_filter = ["set_path", "title", "addtime"] # 搜索过滤器
    model_icon = "fa fa-share-alt"  # 这样可以替换与设置原有的Xadmin的图标


xadmin.site.register(SharingSetModel, SharingSetModelAdmin)
