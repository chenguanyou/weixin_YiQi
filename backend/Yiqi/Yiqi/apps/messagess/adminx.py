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

from messagess.models import SysUserModel, SysUserthemenuModel


class SysUserModelAdmin(object):
    list_display = ["sysname", "sysIntroduction", "addtime"]  # 后台显示类型
    model_icon = "fa fa-commenting"  # 这样可以替换与设置原有的Xadmin的图标
    list_editable = ["sysname", "sysIntroduction"]  # 修改

class SysUserthemenuModelAdmin(object):
    list_display = ["sysuser", "themenu_name", "urls", "addtime"]  # 后台显示类型
    model_icon = "fa fa-commenting"  # 这样可以替换与设置原有的Xadmin的图标
    list_editable = ["sysuser", "themenu_name", "urls"]  # 修改

xadmin.site.register(SysUserModel, SysUserModelAdmin)
xadmin.site.register(SysUserthemenuModel, SysUserthemenuModelAdmin)
