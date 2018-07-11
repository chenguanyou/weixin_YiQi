// pages/messages/sysMessages/sysMessages.js
const app = getApp()
var Request = require("../../../utils/request.js");
var UploadImage = require("../../../utils/uploadimage.js");
var thatDate = require("../../../utils/thatdate.js");
var showToast = require("../../../utils/showToast.js");
var UpImages = require("../../../utils/UpImages.js")
var Re = require("../../../utils/re.js");
var Api = require("../../../api/api.js")

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
    var id = options.id
    var name = options.name
    // 设置消息标题
    wx.setNavigationBarTitle({
      title: name,
    })
    // 获取消息内容
    Request.request(Api.UserMessageListViewSet, {
        id: id
      }, 'GET')
      .then(function(res) {
        if (res.data.length != 0) {
          that.setData({
            message_list: res.data,
            message_info: res.data[0].sysuser.sysusers
          })
        } else {
          // 获取系统消息用户
          Request.request(Api.SysMessages + id + '/', '', 'GET')
            .then(function(res) {
              console.log(res)
              that.setData({
                message_info: res.data.sysusers
              })
            })
        }
        that.pageScrollToBottom()
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
    var that = this;
    that.pageScrollToBottom()
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
  // 点击进入活动详情
  xiangqing: function(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../index/Eventdetails/Eventdetails?activityid=' + id,
    })
  },
  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('.sysmessages_view').boundingClientRect(function(rect) {
      try {
        if (rect.height < 500) {
          return false
        }
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: 1000
        })
      } catch (err) {}
    }).exec()

  },
})