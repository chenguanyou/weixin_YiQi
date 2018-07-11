from datetime import datetime

from weixin.pay import WeixinPay, WXAppPay

APPID = 'wx1a66ade27075a7fc'

MCHID = '1469243702'

API_KEY = 'HSJUJJSH8281iwjsjkks8JKEEKKE8SPQ'


wxpay = WeixinPay(appid=APPID,
                  mch_id=MCHID,
                  api_key=API_KEY,
                  partner_key=API_KEY)

press = int(100.19 * 100)
print(press)

create_pay_info = {
    'body': '1ha2111i',  # 商品描述
    'out_trade_no': '28999919911999934496',  # 商户订单号
    'total_fee': press,  # 标价金额
    'spbill_create_ip': '133.125.12.123',  # 终端IP
    'notify_url': 'http://www.wei1xin.qq.com/wxpay/pay.php',  # 通知地址
    'trade_type': 'JSAPI',  # 交易类型
    'openid': 'oI-n80EBQTFeyjsR88EjtCoAkEkE'  # 用户的open-id
}

if __name__ == '__main__':
    print('1')

    A = WXAppPay(appid=APPID,
                 mch_id=MCHID,
                 partner_key=API_KEY)

    test = A.unifiedorder(**create_pay_info)

    data = dict(test)  # 把微信小程序支付返回的数据转换成字典
    print(data)
    appid = data['appid']  # 小程序ID
    mch_id = data['mch_id']  # 商户号
    nonce_str = data['nonce_str']  # 随机字符串
    sign = data['sign']  # 签名值
    result_code = data['result_code']  # 业务结果
    prepay_id = data['prepay_id']  # 预支付交易会话标识
    trade_type = data['trade_type']  # 交易类型
    time_stamp = data['time_stamp']  # 时间

    print('appid:', appid)
    print('mch_id:', mch_id)
    print('nonce_str:', nonce_str)
    print('sign:', sign)
    print('result_code:', result_code)
    print('prepay_id:', prepay_id)
    print('trade_type:', trade_type)
    print('datatime:', time_stamp)
