// pages/user/user.js
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
    var that = this
    if (!app.globalData.jwt) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    // 获取个人信息
    Request.request(Api.GetUser, '', 'GET')
      .then(function(res) {
        console.log(res)
        that.setData(res.data)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
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
              showToast.showToast('更换成功', 'success')
              setTimeout(function() {
                that.onLoad()
              }, 500)
            } else {
              showToast.showToast('更换失败', 'success')
            }
          })
      })
  },
  // 点击我的信息跳转
  wodexinxi: function() {
    wx.navigateTo({
      url: './userinfo/userinfo',
    })
  },
  // 点击我发布的跳转
  wofabude: function() {
    wx.navigateTo({
      url: './UserAllActivity/UserAllActivity',
    })
  },
  // 浏览记录
  liulanjilu: function() {
    wx.navigateTo({
      url: './userjiaoyin/userjiaoyin',
    })
  },
  // 我的收藏
  collection: function() {
    wx.navigateTo({
      url: './collection/collection',
    })
  },
  // 我的报名跳转
  wodebaoming: function() {
    wx.navigateTo({
      url: './usersingup/usersingup',
    })
  },
  // 建议反馈
  Advicefeedback:function(){
    wx.navigateTo({
      url: './Advicefeedback/Advicefeedback',
    })
  }
})