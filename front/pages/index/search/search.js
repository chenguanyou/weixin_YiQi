// pages/index/search/search.js
const app = getApp()
var Api = require("../../../api/api.js")
var Request = require("../../../utils/request.js");
var showToast = require("../../../utils/showToast.js");
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var data_lists = new Array
var all_data_list = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_data: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var search_text = options.search_text

    wx.setNavigationBarTitle({
      title: '活动搜索',
    })
    // 根据不同的设备设置地图高度全屏
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          Height: res.windowHeight,
          Width: res.screenWidth,
        })
      }
    })
    Request.request(Api.SearchAll + search_text, '', 'GET')
      .then(function(res) {
        if (res.data.results.length != 0 ) {
          var next = res.data.next
          all_data_list = reconstructionArray.reconstructionArray(res.data.results)
          data_lists = res.data.results
          console.log(data_lists)
          that.setData({
            all_data: all_data_list,
            next: next
          })
        }
      })
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
  onReady: function() {

  },
  // 上拉加载更多
  loadMore: function () {
    this.onReachBottom()
    console.log('11111111111')
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    if (that.data.next == null) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return false
    }
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // 下一页
    Request.request(that.data.next, '', 'GET')
      .then(function(res) {
        for (var i = 0; i < res.data.results.length; i++) {
          data_lists.push(res.data.results[i])
        }
        all_data_list = reconstructionArray.reconstructionArray(data_lists)

        that.setData({
          all_data: all_data_list,
          next: res.data.next
        })
      })
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
  xiangqing: function(event) {
    var activityid = event.currentTarget.dataset.activityid
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
})