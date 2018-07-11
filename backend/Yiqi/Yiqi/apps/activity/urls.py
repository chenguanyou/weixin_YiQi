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

from activity.views import ActivityTypeView, UploadTextDateView, SlideIndexViewSet, SearchAllDateViewSet, \
    MapModelAllDateViewSet, StartAllDataViewSet, RegistrationAllDataViewSet

router = DefaultRouter()

router.register(r'ActivityTypeView', ActivityTypeView, base_name='ActivityTypeView')  # 登陆
router.register(r'SlideIndexViewSet', SlideIndexViewSet, base_name='SlideIndexViewSet')
router.register(r'SearchAllDateViewSet', SearchAllDateViewSet, base_name='SearchAllDateViewSet')
router.register(r'MapModelAllDateViewSet', MapModelAllDateViewSet, base_name='MapModelAllDateViewSet')
router.register(r'StartAllDataViewSet', StartAllDataViewSet, base_name='StartAllDataViewSet')
router.register(r'RegistrationAllDataViewSet', RegistrationAllDataViewSet, base_name='RegistrationAllDataViewSet')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^UploadTextDateView/$', UploadTextDateView.as_view(), name='UploadTextDateView'),  # 保存活动数据
]
