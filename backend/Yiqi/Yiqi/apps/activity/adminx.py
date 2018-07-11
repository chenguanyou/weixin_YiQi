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
from xadmin import views  # 引入xadmin的主题视图来支持主题选择
from activity.models import ActivityModel, ActivityTypeModel, ActivityImagesModel, SlideModels


# 修改xadmin的头部和底部信息
class GlobalSetting(object):
    site_title = "一起哟管理系统"
    site_footer = "一起哟管理系统"
    menu_style = "accordion"  # 把App收缩起来


class ActivityTypeModelAdmin(object):
    list_display = ["name", "Introduction", 'indexnum', "addtime"]  # 后台显示类型
    search_fields = ["name", "Introduction", 'indexnum', "addtime"]  # 设置搜索
    list_filter = ["name", "Introduction", 'indexnum', "addtime"]  # 搜索过滤器
    model_icon = "fa fa-refresh"  # 这样可以替换与设置原有的Xadmin的图标
    list_editable = ["indexnum", "Introduction"]  # 修改
    exclude = ('addtime',)


class ActivityImages(object):
    model = ActivityImagesModel
    extra = 0


class ActivityModelAdmin(object):
    list_display = ["user", "title", 'audit', 'content', "startdate", "enddate", "address", "latitude", "longitude",
                    "activitytype", "limitnum", "username", "wechat", "istrue", "thedraft", "addtime"]  # 后台显示类型
    search_fields = ["user", "title", 'audit', 'content', "startdate", "enddate", "address", "latitude", "longitude",
                     "activitytype", "limitnum", "username", "wechat", "istrue", "thedraft", "addtime"]  # 设置搜索
    list_filter = ["user", "title", 'audit', 'content', "startdate", "enddate", "address", "latitude", "longitude",
                   "activitytype", "limitnum", "username", "wechat", "istrue", "thedraft", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-etsy"  # 这样可以替换与设置原有的Xadmin的图标
    list_editable = ["audit", "thedraft"]  # 修改
    exclude = ('addtime',)
    inlines = [ActivityImages, ]


class ActivityImagesModelAdmin(object):
    list_display = ["activity", "addtime"]  # 后台显示类型
    search_fields = ["activity", "addtime"]  # 设置搜索
    list_filter = ["activity", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-camera"  # 这样可以替换与设置原有的Xadmin的图标
    exclude = ('addtime',)


class SlideModelsAdmin(object):
    list_display = ['activity', 'indexnum']
    search_fields = ['activity', 'indexnum']
    list_filter = ['activity', 'indexnum']
    model_icon = "fa fa-picture-o"
    list_editable = ["indexnum"]
    exclude = ('addtime',)


xadmin.site.register(ActivityTypeModel, ActivityTypeModelAdmin)
xadmin.site.register(ActivityModel, ActivityModelAdmin)
xadmin.site.register(ActivityImagesModel, ActivityImagesModelAdmin)
xadmin.site.register(SlideModels, SlideModelsAdmin)
xadmin.site.register(views.CommAdminView, GlobalSetting)  # 注册修改xadmin后台的页头和底部信息
