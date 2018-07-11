// pages/user/UserAllActivity/UserAllActivity.js
const app = getApp()
var Request = require("../../../utils/request.js");
var UploadImage = require("../../../utils/uploadimage.js");
var thatDate = require("../../../utils/thatdate.js");
var showToast = require("../../../utils/showToast.js");
var UpImages = require("../../../utils/UpImages.js")
var Re = require("../../../utils/re.js");
var Api = require("../../../api/api.js")
var this_datetime = require("../../../utils/datetime.js"); //引入apijs
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var data_lists = new Array
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
  onLoad: function (options) {
    var that = this;
    Request.request(Api.ActivityUserinfoView, '', 'GET')
      .then(function (res) {
        console.log(res, 'jy')
        all_data_list = reconstructionArray.reconstructionArrays(res.data)
        that.setData({
          all_data: all_data_list
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
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  // 点击进入活动详情
  xiangqing: function (event) {
    var activityid = event.currentTarget.dataset.activityid
    wx.navigateTo({
      url: '../../../pages/index/Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
})