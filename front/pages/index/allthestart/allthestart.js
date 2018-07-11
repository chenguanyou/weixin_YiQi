// pages/index/allthestart/allthestart.js
const app = getApp()
var Api = require("../../../api/api.js")
var Request = require("../../../utils/request.js");
var showToast = require("../../../utils/showToast.js");
var CountDownDate = require("../../../utils/CountDownDate.js")
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var timer = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取注册页面分享数据
    Request.request(Api.ActivitySharingViewSet, '', 'GET')
      .then(function (res) {
        that.setData({
          gensharing: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // 即将开始数据
    Request.request(Api.StartAllDataViewSet, '', 'GET')
      .then(function (res) {
        // 计算即将开始
        var start_data = new Array
        for (var i = 0; i < res.data.results.length; i++){
          var start_date = CountDownDate.CountDownDate(res.data.results[i].startdate)
          start_data.push([res.data.results[i], start_date])
        }
        that.setData({
          startDateList: start_data
        })
        console.log(that.data)
        timer = setInterval(function () {
          var start_data = new Array
          for (var i = 0; i < res.data.results.length; i++) {
            var start_date = CountDownDate.CountDownDate(res.data.results[i].startdate)
            start_data.push([res.data.results[i], start_date])
          }
          that.setData({
            startDateList: start_data
          })
        }, 1000)
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
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
    // 点击进入活动详情
  xiangqing: function (event) {
    var activityid = event.currentTarget.dataset.activityid
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
})