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
import xadmin
from django.views.static import serve
from django.conf.urls import url, include

from Yiqi.settings import MEDIA_ROOT, MEDIA_URL, STATIC_ROOT

urlpatterns = [
    url('YiqiAdmin0001shujian/', include(xadmin.site.urls)),
    url(r'^upload/(?P<path>.*)$', serve, {'document_root': MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': STATIC_ROOT}),
    url('^users/', include('users.urls', namespace='users')),
    url('^activity/', include('activity.urls', namespace='activity')),
    url('^SharingSet/', include('SharingSet.urls', namespace='SharingSet')),
    url('^userOperation/', include('userOperation.urls', namespace='userOperation')),
    url('^messages/', include('messagess.urls', namespace='messages')),
]
