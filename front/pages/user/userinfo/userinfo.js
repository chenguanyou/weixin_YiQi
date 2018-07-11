// pages/user/userinfo/userinfo.js
const app = getApp()
var Request = require("../../../utils/request.js");
var UploadImage = require("../../../utils/uploadimage.js");
var thatDate = require("../../../utils/thatdate.js");
var showToast = require("../../../utils/showToast.js");
var UpImages = require("../../../utils/UpImages.js")
var Re = require("../../../utils/re.js");
var Api = require("../../../api/api.js")
var this_datetime = require("../../../utils/datetime.js"); //引入apijs
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    phonehiddeninput: true,
    thesignatureinput: true,
    XINGBIE_STR: [{
      id: 1,
      name: '男'
    }, {
      id: 2,
      name: '女'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 获取个人信息
    Request.request(Api.GetUser, '', 'GET')
      .then(function(res) {
        console.log(res)
        that.setData(res.data)
        var thesignature = new Array
        if (res.data.thesignature.length > 7){
          for (var i = 0; i < 7; i++){
            thesignature.push(res.data.thesignature[i])
          }
        }
        that.setData({
          thesignature: thesignature.join(''),
          thesignatures: res.data.thesignature
        })
      })
    // 获取当前时间设置为生日选择器的结束时间
    var date_end = this_datetime.formatTime(new Date());
    that.setData({
      date_end: date_end
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  // 更换背景和更换头像
  huanbeijing: function(event) {
    var that = this
    var types = event.currentTarget.dataset.type
    //选着照片
    var that = this
    UploadImage.uploadImage(1)
      .then(function(image_path) {
        UpImages.UpImages(Api.GetUser, image_path.tempFilePaths[0], {
            'types': types
          })
          .then(function(res) {
            if (res.statusCode == 200) {
              console.log(res)
              showToast.showToast('更改成功', 'success')
              setTimeout(function() {
                that.onLoad()
              }, 500)
            } else {
              showToast.showToast('更改失败', 'none')
            }
          })
      })
  },
  XINGBIE: function(e) {
    var that = this;
    // 获取用户选择的性别
    var new_shengri = parseInt(e.detail.value) + 1;
    var types = e.currentTarget.dataset.type
    Request.request(Api.GetUser, {
        types: types,
        new_shengri: new_shengri
      }, 'POST')
      .then(function(res) {
        console.log(res)
        that.onLoad()
        showToast.showToast('更改成功', 'success')
      })
  },
  // 更改生日
  bindDateChangess: function(e) {
    var that = this;
    var types = e.currentTarget.dataset.type
    var sr = e.detail.value
    Request.request(Api.GetUser, {
        types: types,
        sr: sr
      }, 'POST')
      .then(function(res) {
        that.onLoad()
        showToast.showToast('更改成功', 'success')
      })
  },
  // 更改昵称
  new_nametap: function(event) {
    var that = this
    console.log(event)
    that.setData({
      hiddenmodalput: false
    })
  },
  // 获取新的昵称内容
  new_name: function(event) {
    var that = this
    var new_names = event.detail.value
    that.setData({
      new_names: new_names
    })
  },
  // 点击取消修改昵称
  cancel: function() {
    var that = this
    that.setData({
      hiddenmodalput: true,
      baoming_name: ''
    })
  },
  // 确认修改昵称
  confirm: function(event) {
    var that = this
    var types = event.currentTarget.dataset.type
    var new_name = that.data.new_names
    if (Re.rekongge.test(new_name) || new_name == '' || new_name == null) {
      showToast.showToast('不能为空或包含多个空格', 'none')
      return false
    } else {
      // 验证通过像服务器发送请求
      Request.request(Api.GetUser, {
          types: types,
          new_name: new_name
        }, 'POST')
        .then(function(res) {
          if (res.statusCode == 200) {
            that.setData({
              hiddenmodalput: true,
              baoming_name: ''
            })
            that.onLoad()
            showToast.showToast(res.data.message, 'success')
          } else {
            showToast.showToast(res.data.message, 'success')
          }
        })
    }
  },
  // 绑定手机号
  NICHENG_PHONE: function() {
    var that = this
    that.setData({
      phonehiddeninput: false
    })
  },
  // 取消绑定手机号
  cancelphone: function() {
    var that = this
    that.setData({
      phonehiddeninput: true,
      value_phone: ''
    })
  },
  // 获取绑定手机号的值
  new_phones: function(event) {
    var that = this
    var new_phone = event.detail.value
    that.setData({
      new_phone: new_phone
    })
  },
  // 点击确定更改手机号的时候
  confirmphone: function(event) {
    var that = this
    var types = event.currentTarget.dataset.type
    var new_phone = that.data.new_phone
    if (Re.rekongge.test(new_phone) || new_phone == '' || new_phone == null) {
      showToast.showToast('不能为空或包含多个空格', 'none')
      return false
    }
    if (!Re.phoneReg.test(new_phone)) {
      showToast.showToast('手机号不正确', 'none')
      return false
    } else {
      // 验证通过像服务器发送请求
      Request.request(Api.GetUser, {
          types: types,
          new_phone: new_phone
        }, 'POST')
        .then(function(res) {
          if (res.statusCode == 200) {
            that.setData({
              phonehiddeninput: true,
              value_phone: ''
            })
            that.onLoad()
            showToast.showToast(res.data.message, 'success')
          } else {
            showToast.showToast(res.data.message, 'none')
          }
        })
    }
  },
  // 修改个性签名
  thesignature: function() {
    var that = this
    that.setData({
      thesignatureinput: false,
      value_thesignature: ''
    })
  },
  // 获取输入的值
  value_thesignature_content: function(event) {
    var that = this
    var new_thesignature = event.detail.value
    that.setData({
      new_thesignature: new_thesignature
    })
  },
  // 取消修改签名按钮
  cancelthesignature: function() {
    var that = this
    that.setData({
      thesignatureinput: true,
      value_thesignature: ''
    })
  },
  // 确认修改按钮
  confirmthesignature: function(event) {
    var that = this
    var types = event.currentTarget.dataset.type
    var new_thesignature = that.data.new_thesignature
    if (Re.rekongge.test(new_thesignature) || new_thesignature == '' || new_thesignature == null) {
      showToast.showToast('不能为空或包含多个空格', 'none')
      return false
    } else {
      // 向服务器发送更改签名并且保存
      Request.request(Api.GetUser, {
          types: types,
          new_thesignature: new_thesignature
        }, 'POST')
        .then(function(res) {
          if (res.statusCode == 200) {
            that.setData({
              thesignatureinput: true,
              value_thesignature: ''
            })
            that.onLoad()
            showToast.showToast(res.data.message, 'success')
          } else {
            showToast.showToast(res.data.message, 'none')
          }
        })
    }

  }
})