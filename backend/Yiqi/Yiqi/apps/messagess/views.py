from django.shortcuts import render
import json
import datetime
from django.shortcuts import render
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

from Yiqi.settings import IMAGES_URL
from userOperation.models import SysMessages
from messagess.models import SysUserthemenuModel, SysUserModel
from messagess.Serializers import SysyUserSerializers, SysuserMessagesSerializers


class SysMessagesViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取系统消息列表
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    queryset = SysUserModel.objects.all()
    serializer_class = SysyUserSerializers


class UserMessageListViewSet(views.APIView):
    '''
    获取系统消息内容
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get(self, request, format=None):
        id = request.GET['id']
        messageslist = SysMessages.objects.filter(user=self.request.user, sysuser__id=id)
        messageslist_serializers = SysuserMessagesSerializers(messageslist, many=True, context={'request': request})
        if messageslist:
            for msg in messageslist:
                msg.ISOPEN = '1'
                msg.save()
        return Response(messageslist_serializers.data)
