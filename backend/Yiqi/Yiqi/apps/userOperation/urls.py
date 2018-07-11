"""Yiqi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from userOperation.views import SharingUserViewSet, BrowseUserViewSet, QrCodeApiViewset, ActivityUserInfoViewSet, \
    ClooectionViewSet, ReportionViewSet, RegisteredUserViewSet, CommentsModelsUserViewSet, UserAllActivityView, \
    UserbrowseView, CollectionUserView, ActivityUserinfoView, FeedBackViewSet

router = DefaultRouter()

router.register(r'UserAllActivityView', UserAllActivityView, base_name='UserAllActivityView')
router.register(r'UserbrowseView', UserbrowseView, base_name='UserbrowseView')
router.register(r'CollectionUserView', CollectionUserView, base_name='CollectionUserView')
router.register(r'ActivityUserinfoView', ActivityUserinfoView, base_name='ActivityUserinfoView')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^SharingUserViewSet/$', SharingUserViewSet.as_view(), name='SharingUserViewSet'),  # 保存活动数据
    url(r'BrowseUserViewSet/$', BrowseUserViewSet.as_view(), name='BrowseUserViewSet'),  # 保存浏览用户
    url(r'QrCodeApi/$', QrCodeApiViewset.as_view(), name='QrCodeApiViewset'),
    url(r'ActivityUserInfo/$', ActivityUserInfoViewSet.as_view(), name='ActivityUserInfo'),
    url(r'ClooectionViewSet/$', ClooectionViewSet.as_view(), name='ClooectionViewSet'),
    url(r'ReportionViewSet/$', ReportionViewSet.as_view(), name='ReportionViewSet'),
    url(r'RegisteredUserViewSet/$', RegisteredUserViewSet.as_view(), name='RegisteredUserViewSet'),
    url(r'CommentsModelsUserViewSet/$', CommentsModelsUserViewSet.as_view(), name='CommentsModelsUserViewSet'),
    url(r'FeedBackViewSet/$', FeedBackViewSet.as_view(), name='FeedBackViewSet')
]
