#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2018/7/5 10:25
# @User    : zhunishengrikuaile
# @File    : wx_token.py
# @Email   : NAME@SHUJIAN.ORG
# @MyBlog  : WWW.SHUJIAN.ORG
# @NetName : 書劍
# @Software: 一起哟预约报名小程序后端
import os
import json
import requests
from PIL import Image
from io import BytesIO

from Yiqi.sys_info import MINI_APP_ID, MINI_APP_SECRET

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

APP_ID = MINI_APP_ID
APP_SECRET = MINI_APP_SECRET
code_urls = "https://api.weixin.qq.com/wxa/getwxacode?access_token="
token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}".format(
    APPID=APP_ID, APPSECRET=APP_SECRET)


def get_token():
    '''
    :return:
    '''
    get_token = requests.get(token_url)
    return get_token


def post_wxcode(code_urls=code_urls, path="pages/index/index", width=430, is_hyaline=True):
    '''
    :return:
    '''
    headers = {'content-type': 'application/json'}
    code_url = code_urls + get_token().json()['access_token']
    data = json.dumps({"path": path, "width": width, 'is_hyaline': is_hyaline})
    code = requests.post(code_url, data=data, headers=headers)
    return code


def image_saver(image_paths="upload/images/", image_name="", qr_code=post_wxcode()):
    '''
    :param file_path:
    :param file_name:
    :return:
    '''
    image_path = os.path.join(BASE_DIR, image_paths)
    image_names = image_path + image_name + '.png'
    if os.path.exists(image_path) == False:
        os.mkdir(image_path)
    wx_code = Image.open(BytesIO(qr_code.content))
    wx_code.save(image_names)
    return image_paths + image_name + '.png'


if __name__ == "__main__":
    test_code = image_saver(image_name='test')
    print(test_code)
