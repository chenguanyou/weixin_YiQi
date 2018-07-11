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
from users.models import UserProFile
from utils.wx_token import post_wxcode, image_saver
from activity.models import ActivityModel
from userOperation.models import SharingUserModel, BrowseUserModel, ActivityUserInfo, CollectionUserModel, \
    ReporttionUserModel, CommentsModels, FeedBackModels, SysMessages
from userOperation.Serializers import RegisteredUserSerializers, CommentSerializers, UserAllActivitySerializers, \
    UserbrowseSerializers, CollectionUserSerializers, \
    ActivityUserInfoSerializers


class SharingUserViewSet(views.APIView):
    '''
    获取分享的用户
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        user = SharingUserModel()
        user.user = self.request.user
        user.save()
        return Response({'messages': '分享成功'}, status=status.HTTP_200_OK)


class BrowseUserViewSet(views.APIView):
    '''
    获取用户浏览记录
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        activityid = request.data['activityid']
        activity = ActivityModel.objects.filter(id=int(activityid))
        BrowseUser = BrowseUserModel.objects.filter(activity=activity[0], user=self.request.user)
        if BrowseUser:
            # 如果浏览记录存在就更新时间
            BrowseUser = BrowseUser[0]
            BrowseUser.addtime = datetime.datetime.now()
            BrowseUser.save()
            return Response(status=status.HTTP_200_OK)
        elif activity:
            # 如果浏览记录不存在就新建浏览记录
            user = BrowseUserModel()
            user.user = self.request.user
            user.activity = activity[0]
            user.save()
        return Response(status=status.HTTP_200_OK)


class QrCodeApiViewset(views.APIView):
    '''
    获取二维码
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get(self, request):
        try:
            path = request.GET['path']
        except:
            path = 'pages/index/index'.strip()
        if path:
            path = str(path).strip()
        else:
            path = 'pages/index/index'.strip()
        image_savers = image_saver(image_name='qr', qr_code=post_wxcode(path=path, is_hyaline=False))
        return Response({'qrcode': IMAGES_URL + image_savers}, status=status.HTTP_200_OK)


class ActivityUserInfoViewSet(views.APIView):
    '''
    保存报名信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        baoming_id = request.data['baoming_id']
        baoming_name = request.data['baoming_name']
        baoming_wechatid = request.data['baoming_wechatid']
        actity = ActivityModel.objects.filter(id=int(baoming_id))
        if actity:
            actity_info = ActivityUserInfo.objects.filter(activity=actity, user=self.request.user)
            if actity_info:
                return Response({'message': '已报名'}, status=status.HTTP_200_OK)
            actity = actity[0]
            if int(actity.registration_number) >= int(actity.limitnum):
                return Response({'message': '报名人数已满'}, status=status.HTTP_401_UNAUTHORIZED)
            activityUser = ActivityUserInfo()
            activityUser.user = self.request.user
            activityUser.activity = actity
            activityUser.username = baoming_name
            activityUser.wechat = baoming_wechatid
            activityUser.save()
            actity.registration_number += 1
            actity.save()

            # 给当前报名的人员发送报名成功系统通知，给当前发起活动的人发送加入通知
            # sysuser = 系统用户
            # user = 接收用户
            # ISOPEN = 是否已读
            # activity = 活动
            # titles = 消息标题
            # content = 消息内容
            from messagess.models import SysUserModel
            usysuser = SysUserModel.objects.filter(types='0')
            if usysuser:
                message0 = SysMessages()
                message0.sysuser = usysuser[0]
                message0.user = self.request.user
                message0.activity = actity
                message0.titles = '加入活动成功通知！'
                message0.content = '您已成功加入【{name}】发起的【{title}】活动，活动时间【{start}】开始，【{end}】结束，快去与活动成员联系吧，记得准时参加活动哦！'.format(
                    name=actity.user.name, title=actity.title,
                    start=datetime.datetime.strftime(actity.startdate, "%Y-%m-%d"),
                    end=datetime.datetime.strftime(actity.enddate, "%Y-%m-%d"))
                message0.save()

                # 给活动发起人发送消息通知
                message = SysMessages()
                message.sysuser = usysuser[0]
                message.user = actity.user
                message.activity = actity
                message.titles = '朋友【{name}】加入了您发起的活动！'.format(name=self.request.user.name)
                message.content = '朋友【{name}】成功加入了您发起的活动，快去和他联系吧！'.format(name=self.request.user.name, )
                message.save()

            self.r = Response({'message': '报名成功'}, status=status.HTTP_200_OK)
            return self.r


class ClooectionViewSet(views.APIView):
    '''
    收藏，取消收藏功能
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        try:
            id = request.data['id']
            activity = ActivityModel.objects.filter(id=int(id))
        except:
            return Response({'message': '收藏有误'}, status=status.HTTP_401_UNAUTHORIZED)
        if activity:
            activity = activity[0]
            collection = CollectionUserModel.objects.filter(activity=activity, user=self.request.user)
            if collection:
                collection[0].delete()
                return Response({'message': '取消收藏成功'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                collection = CollectionUserModel()
                collection.user = self.request.user
                collection.activity = activity
                collection.save()
        return Response({'message': '收藏成功'}, status=status.HTTP_200_OK)


class ReportionViewSet(views.APIView):
    '''
    用户举报
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        '''
        获取用户举报
        :param request:
        :return:
        '''
        try:
            id = request.data['id']
            content = request.data['jubaoinput_content']
            user = self.request.user
        except:
            id, content = None
        if (id != None) and (content != None):
            report = ReporttionUserModel.objects.filter(user=user, activity__id=id)
            if report:
                return Response({'messages': '您已举报'}, status=status.HTTP_200_OK)
            else:
                active = ActivityModel.objects.filter(id=id)
                if active:
                    report = ReporttionUserModel()
                    report.user = self.request.user
                    report.activity = active[0]
                    report.contion = content
                    report.save()
                    return Response({'messages': '举报成功'}, status=status.HTTP_200_OK)
        return Response({'messages': '举报出错'}, status=status.HTTP_401_UNAUTHORIZED)


class RegisteredUserViewSet(views.APIView):
    '''
    获取当前报名的用户信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get(self, request, format=None):
        '''
        获取已经报名的用户，如果没有报名就不能看到已经报名用户的信息
        :param request:
        :param format:
        :return:
        '''
        try:
            id = request.GET['id']
            user = self.request.user
        except:
            id = None
        if id != None:
            registeredUser = ActivityUserInfo.objects.filter(activity__id=id)
            registeredUser_Serializers = RegisteredUserSerializers(registeredUser, many=True,
                                                                   context={'user': user, 'id': id})
            return Response(registeredUser_Serializers.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserAllActivityView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取当前用户发布的所有信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        query = ActivityModel.objects.filter(user=self.request.user).order_by('-addtime')
        return query

    serializer_class = UserAllActivitySerializers


class UserbrowseView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取当前用户浏览的所有信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        query = BrowseUserModel.objects.filter(user=self.request.user).order_by('-addtime')
        return query

    serializer_class = UserbrowseSerializers


class ActivityUserinfoView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取当前用户浏览的所有信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        query = ActivityUserInfo.objects.filter(user=self.request.user, type='1').order_by('-addtime')
        return query

    serializer_class = ActivityUserInfoSerializers


class CollectionUserView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''
    获取当前用户收藏的所有信息
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        query = CollectionUserModel.objects.filter(user=self.request.user).order_by('-addtime')
        return query

    serializer_class = CollectionUserSerializers


class FeedBackViewSet(views.APIView):
    '''
    用户反馈接口
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def post(self, request):
        title = request.data['title']
        content = request.data['content']
        user = self.request.user
        try:
            file = request.data['file']
        except:
            file = None
        feed = FeedBackModels()
        feed.user = user
        feed.title = title
        feed.centent = content
        if file != None:
            feed.images = file
        feed.save()
        messages = {'messages': '反馈成功'}
        return Response(messages, status=status.HTTP_200_OK)


class CommentsModelsUserViewSet(views.APIView):
    '''
    获取当前活动的全部评论数据
    '''
    authentication_classes = (authentication.SessionAuthentication, JSONWebTokenAuthentication)  # Token验证
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get(self, request, format=None):
        '''
        获取评论数据
        :param request:
        :param format:
        :return:
        '''
        # # res = {'status': True, 'data': None, 'msg': None}
        try:
            id = request.GET['id']
            user = self.request.user
        except:
            id = None
        if id != None:
            this_act_com = CommentsModels.objects.filter(activity__id=id)
            #     #
            #     msg_list = list(this_act_com.values())
            #     msg_list_dict = {}  # 加快索引,节省时间
            #     for item in msg_list:
            #         item['child'] = []
            #         user_info = UserProFile.objects.filter(id=int(item['user_id']))[0]
            #         user_info = {
            #             'id':user_info.id,
            #             'avatar': IMAGES_URL + 'upload/' + str(user_info.avatar),
            #             'name': user_info.name,
            #             'gender': user_info.gender,
            #         }
            #         item['user_id'] = user_info
            #         item['addtime'] = datetime.datetime.strftime(item['addtime'], "%Y-%m-%d %H:%M")
            #         msg_list_dict[item['id']] = item  # 字典中key为item['id']，value为item
            #     # 把字典数据结构填上数据,能够加快索引,而且我们数据还是占得原来的内从空间
            #     # 我们只是引用了数据的内容空间,所以不存在新的数据结构浪费空间一说
            #     result = []
            #     for item in msg_list:
            #         pid = item['parent_comment_id']
            #         if pid:  # 如果parent_id不为空,说明它是子级,要把自己加入对应的父级
            #             msg_list_dict[pid]['child'].append(item)
            #         else:  # 如果为空,说明他是父级,要把它单独领出来用
            #             result.append(item)
            #     # result就是我们最终要的结果,因为这里面全是引用,所有数据的内存地址都没有变
            #     # 只不过被多个数据结构引用了而已
            #     return Response(result, status=status.HTTP_200_OK)
            #
            this_act_com_Serializers = CommentSerializers(this_act_com, many=True, context={'user': user, 'id': id})
            return Response(this_act_com_Serializers.data)

        return Response(status=status.HTTP_401_UNAUTHORIZED)
