from django.shortcuts import render
import datetime
from django.shortcuts import render
from rest_framework import mixins
from rest_framework import status
from rest_framework import views, viewsets
from rest_framework.response import Response
# 身份验证
from rest_framework import authentication
from utils.permissions import IsOwnerOrReadOnly  # 登陆验证
from rest_framework.permissions import IsAuthenticated  # 登陆验证
from rest_framework_jwt.authentication import JSONWebTokenAuthentication  # 身份验证
# 身份验证

# Create your views here.
from SharingSet.models import SharingSetModel
from SharingSet.Serializerss import SharingSerializers


class SharingViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取全部分享设置的数据
    '''
    SET_PATH = ''

    def get_queryset(self):
        queryset = SharingSetModel.objects.filter(set_path=self.SET_PATH)
        return queryset

    serializer_class = SharingSerializers


class GeneralSharingViewSet(SharingViewSet):
    '''
    获取通用分享数据
    '''
    SET_PATH = '0'


class ActivitySharingViewSet(SharingViewSet):
    '''
    获取活动页面分享数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    SET_PATH = '1'


class ReleaseSharingViewSet(SharingViewSet):
    '''
    获取发布页面分享数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    SET_PATH = '2'


class FoundSharingViewSet(SharingViewSet):
    '''
    获取发现页面分享数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    SET_PATH = '3'


class MessagesSharingViewSet(SharingViewSet):
    '''
    获取消息页面分享数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    SET_PATH = '4'


class ContentSharingViewSet(SharingViewSet):
    '''
    获取内容页面分享数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    SET_PATH = '5'
