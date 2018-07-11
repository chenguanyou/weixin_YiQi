// pages/index/Eventdetails/details/details.js
const app = getApp()
var Api = require("../../../../api/api.js")
var Re = require("../../../../utils/re.js");
var Request = require("../../../../utils/request.js");
var showToast = require("../../../../utils/showToast.js");
var reconstructionArray = require("../../../../utils/reconstructionArray.js")
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
    wx.setNavigationBarTitle({
      title: '活动详情',
    })
    Request.request(Api.Eventdetails + id + '/', '', 'GET')
      .then(function (res) {
        if (res.statusCode == 404) {
          showToast.showToast('没有这个活动', 'none')
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
          return false
        } else if (res.statusCode == 200){
          that.setData(res.data)
          console.log(res.data)
        }
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
  // onShareAppMessage: function() {

  // }
})