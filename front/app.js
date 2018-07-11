//app.js
var api_url = require("./api/api.js"); //引入apijs


App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var jwt = wx.getStorageSync('jwt');
    var that = this;
    if (!jwt) { //检查 jwt 是否存在 如果不存在调用登录
    } else {
      this.globalData.jwt = jwt
    }
  },

  login: function(e) {
    var userinfo = e
    // 登录部分代码
    var that = this;
    wx.login({
      // 调用 login 获取 code
      success: function(res) {
        var code = res.code;
        try {
          that.globalData.userInfo = userinfo.detail.userInfo;
          var encryptedData = userinfo.detail.encryptedData || 'encry';
          var iv = userinfo.detail.iv || 'iv';
        } catch (e) {
          return false
        }
        wx.request({ // 发送请求 获取 jwt
          url: api_url.login,
          header: {
            Authorization: 'JWT' + that.globalData.access_token,
          },
          data: {
            username: encryptedData,
            password: iv,
            code: code,
          },
          method: "POST",
          success: function(res) {
            if (res.statusCode === 200) {
              // 得到 jwt 后存储到 storage，
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              });
              wx.setStorage({
                key: "jwt",
                data: res.data.token
              });
              that.globalData = res.data
              that.globalData.jwt = res.data.token
              that.globalData.access_token = res.data.token;
              that.globalData.account_id = res.data.sub;
            } else if (res.statusCode === 400) {
              // 如果没有注册调用注册接口
              that.register(userinfo);
            } else {
              // 提示错误信息
              wx.showToast({
                title: res.data.text,
                icon: 'success',
                duration: 2000
              });
            }
          },
          fail: function(res) {}
        })
      }
    })

  },
  register: function(e) {
    // 注册代码
    var that = this;
    var userinfo = e
    wx.login({ // 调用登录接口获取 code
      success: function(res) {
        var code = res.code;
        try {
          that.globalData.userInfo = userinfo.detail.userInfo;
          var encryptedData = userinfo.detail.encryptedData || 'encry';
          var iv = userinfo.detail.iv || 'iv';
        } catch (e) {
          return false
        }
        wx.request({ // 请求注册用户接口
          url: api_url.Registered,
          header: {
            // Authorization: config.basic_token
          },
          data: {
            username: encryptedData,
            password: iv,
            code: code,
          },
          method: "POST",
          success: function(res) {
            if (res.statusCode == 201) {
              that.login(userinfo);
            }
            if (res.statusCode == 401) {
              that.register(userinfo);
            }
          },
          fail: function(res) {}
        })

      }
    })

  },
  globalData: {
    userInfo: null,
    jwt: null
  }
})