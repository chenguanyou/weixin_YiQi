// pages/index/Eventdetails/reguser/reguser.js
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
    sharing_view:true,
    showModal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  // 获取已经报名的用户信息
  Request.request(Api.RegisteredUserViewSet, {
    id: options.id
  }, 'GET')
    .then(function (res) {
      console.log(res, '已报名用户')
      that.setData({
        register: res.data
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
  info:function(event){
    var that = this;
    var username = event.currentTarget.dataset.username
    var wechat = event.currentTarget.dataset.wechat
    that.setData({
      sharing_view: false,
      showModal: true,
      username: username,
      wechat: wechat
    })
  },
  // 点击隐藏
  outbtn:function(){
    var that = this;
    that.setData({
      sharing_view: true,
      showModal: false
    })
  }
})