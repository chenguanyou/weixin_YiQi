var wxreg = /^[a-zA-Z-0-9]([-_a-zA-Z0-9]{5,19})+$/; //验证微信号码

var name = /^[\u4e00-\u9fa5]{2,4}$/; //验证姓名

var integer = /^\+?[1-9][0-9]*$/;  //验证是否为整数

var rekongge = /[~#^$@%&!*()<>:;'"{}【】 	]/gi;  //去除空格

var rekongge0 = /[~#^$@%&!*]/gi; //检查内容是否有五个空格

//验证手机号
var phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;

module.exports = {
  name: name,
  wxreg: wxreg,
  integer: integer,
  phoneReg: phoneReg,
  rekongge: rekongge,
  rekongge0: rekongge0,
}