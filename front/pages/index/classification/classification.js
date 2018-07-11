// pages/index/classification/classification.js
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
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取分类数据
    Request.request(Api.ActivityType, '', 'GET')
      .then(function(res) {
        all_data_list = reconstructionArray.reconstructionArray(res.data)
        that.setData({
          ActivityType: all_data_list,
        })
      }, function(error) {});

    // 获取注册页面分享数据
    Request.request(Api.ActivitySharingViewSet, '', 'GET')
      .then(function(res) {
        that.setData({
          gensharing: res.data
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
    var sharedata = reconstructionArray.getRandomArrayElements(that.data.gensharing, 1)[0]
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
  // 点击分类进行跳转
  activity_list: function(event) {
    var that = this
    var classificationsid = event.currentTarget.dataset.classificationsid
    var classificationsname = event.currentTarget.dataset.activityname
    console.log(event)
    wx.navigateTo({
      url: '../typeall/typeall?classificationsid=' + classificationsid + '&classificationsname=' + classificationsname,
    })
  }
})