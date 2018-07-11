const app = getApp()
var Request = require("../../utils/request.js");
var UploadImage = require("../../utils/uploadimage.js");
var thatDate = require("../../utils/thatdate.js");
var showToast = require("../../utils/showToast.js");
var UpImages = require("../../utils/UpImages.js")
var Re = require("../../utils/re.js");
var Api = require("../../api/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (!app.globalData.jwt) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    // 获取系统消息用户
    Request.request(Api.SysMessages, '', 'GET')
      .then(function(res) {
        console.log(res)
        that.setData({
          sysuser_info: res.data[0]
        })
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
    this.onLoad()
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
    this.onLoad()
    this.onShow()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  // 跳转到消息详情
  sysmessages: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id
    var name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: './sysMessages/sysMessages?id=' + id + '&name=' + name,
    })
  }
})