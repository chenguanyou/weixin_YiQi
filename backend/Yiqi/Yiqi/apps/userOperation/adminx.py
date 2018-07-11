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
from userOperation.models import ActivityUserInfo, SharingUserModel, CollectionUserModel, ReporttionUserModel, \
    BrowseUserModel, CommentsModels, FeedBackModels, SysMessages


class ActivityUserInfoAdmin(object):
    list_display = ["user", "activity", "username", "wechat", "addtime"]  # 后台显示类型
    search_fields = ["user", "activity", "username", "wechat", "addtime"]  # 设置搜索
    list_filter = ["user", "activity", "username", "wechat", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标
    exclude = ('addtime',)


class SharingUserModelAdmin(object):
    list_display = ["user", "addtime"]  # 后台显示类型
    search_fields = ["user", "addtime"]  # 设置搜索
    list_filter = ["user", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class CollectionUserModelAdmin(object):
    list_display = ["user", "activity", "addtime"]  # 后台显示类型
    search_fields = ["user", "activity", "addtime"]  # 设置搜索
    list_filter = ["user", "activity", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class ReporttionUserModelAdmin(object):
    list_display = ["user", "activity", "contion", "addtime"]  # 后台显示类型
    search_fields = ["user", "activity", "contion", "addtime"]  # 设置搜索
    list_filter = ["user", "activity", "contion", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class BrowseUserModelModelAdmin(object):
    list_display = ["user", "activity", "addtime"]  # 后台显示类型
    search_fields = ["user", "activity", "addtime"]  # 设置搜索
    list_filter = ["user", "activity", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class CommentModelAdmin(object):
    list_display = ["user", "activity", "parent_comment", "centent", "addtime"]  # 后台显示类型
    search_fields = ["user", "activity", "parent_comment", "centent", "addtime"]  # 设置搜索
    list_filter = ["user", "activity", "parent_comment", "centent", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class FeedBackModelsAdmin(object):
    list_display = ["user", "title", "centent", "addtime"]  # 后台显示类型
    search_fields = ["user", "title", "centent", "addtime"]  # 设置搜索
    list_filter = ["user", "title", "centent", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-pencil-square-o"  # 这样可以替换与设置原有的Xadmin的图标


class SysMessagesAdmin(object):
    list_display = ["sysuser", "user", "activity", "titles", "content", "addtime"]  # 后台显示类型
    search_fields = ["sysuser", "user", "activity", "titles", "content", "addtime"]  # 设置搜索
    list_filter = ["sysuser", "user", "activity", "titles", "content", "addtime"]  # 搜索过滤器
    model_icon = "fa fa-comments"  # 这样可以替换与设置原有的Xadmin的图标


xadmin.site.register(ActivityUserInfo, ActivityUserInfoAdmin)
xadmin.site.register(SharingUserModel, SharingUserModelAdmin)
xadmin.site.register(CollectionUserModel, CollectionUserModelAdmin)
xadmin.site.register(ReporttionUserModel, ReporttionUserModelAdmin)
xadmin.site.register(BrowseUserModel, BrowseUserModelModelAdmin)
xadmin.site.register(CommentsModels, CommentModelAdmin)
xadmin.site.register(FeedBackModels, FeedBackModelsAdmin)
xadmin.site.register(SysMessages, SysMessagesAdmin)
