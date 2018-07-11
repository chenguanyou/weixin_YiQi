// pages/login/login.js
const app = getApp()
var Api = require("../../api/api.js")
var Request = require("../../utils/request.js");
var reconstructionArray = require("../../utils/reconstructionArray.js")
var timer = ''
var num = 0
var content = "《发起活动及内容应该有哪些限制》在您使用本软件的同时，请认真且时刻遵守法律法规，在您发布活动内容的时候，应该在法律允许的范围内，如果发起的内容被大量用户举报且违反了相关的法律法规，一经发现，本软件有权限对您发布的内容进行永久删除，并对您进行封号处理！一起哟，让生活不孤单，让兴趣不流浪。祝您使用愉快! "

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (app.globalData.jwt) {
      wx.switchTab({
        url: '../index/index',
      })
    }
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
    var that = this
    // 获取注册页面分享数据
    Request.request(Api.GeneralSharingViewSet, '', 'GET')
      .then(function(res) {
        that.setData({
          gensharing: res.data
        })
      })
    console.log(that.data)
    timer = setInterval(this.onLoad, 2000)
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
    clearInterval(timer);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    var sharedata = reconstructionArray.getRandomArrayElements(that.data.gensharing, 1)[0]
    return {
      title: sharedata.title,
      path: 'pages/index/index',
      imageUrl: sharedata.imageUrl,
    }
  },
  agreeGetUser: function(e) {
    var that = this;
    that.setData({
      disabled: true,
    })
    app.login(e);
  },
  checkboxChange: function(e) {
    var that = this;
    console.log(num)
    if (num == 0) {
      num = 1
      that.setData({
        disabled: false
      })
      return false
    } else {
      num = 0
      that.setData({
        disabled: true
      })
      return false
    }
  },
  // 点击阅读协议
  yuedu: function() {
    var that = this
    wx.showModal({
      title: '使用协议',
      content: content,
      showCancel: false,
      confirmText: '我已阅读',
      confirmColor: '#eb4901'
    })
  }
})