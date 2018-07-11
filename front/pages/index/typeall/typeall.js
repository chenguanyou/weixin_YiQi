// pages/index/typeall/typeall.js
const app = getApp()
var Api = require("../../../api/api.js")
var Request = require("../../../utils/request.js");
var showToast = require("../../../utils/showToast.js");
var CountDownDate = require("../../../utils/CountDownDate.js")
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var all_data_list = ''

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
    var that = this
    var classificationsid = options.classificationsid
    var classificationsname = options.classificationsname
    // 设置标题
    wx.setNavigationBarTitle({
      title: classificationsname,
    })
    // 获取分类下面的数据
    // 获取分类数据
    Request.request(Api.ActivityType + classificationsid + '/', '', 'GET')
      .then(function(res) {
        all_data_list = reconstructionArray.reconstructionArray(res.data.activitytype)
        that.setData({
          all_data: all_data_list,
        })
      }, function(error) {});

    setTimeout(function () {
      // 获取注册页面分享数据
      Request.request(Api.GeneralSharingViewSet, '', 'GET')
        .then(function (res) {
          that.setData({
            sharing: res.data
          })
        })
    }, 1200)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var sharedata = reconstructionArray.getRandomArrayElements(that.data.sharing, 1)[0]
    return {
      title: sharedata.title,
      path: 'pages/index/index',
      imageUrl: sharedata.imageUrl,
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        })
        // 获取分享用户
        Request.request(Api.SharingUserViewSet, '', 'POST')
          .then(function (res) {
            console.LOG(res)
          })
      }
    }
  },
  // 点击进入活动详情
  xiangqing: function (event) {
    var activityid = event.currentTarget.dataset.activityid
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
})