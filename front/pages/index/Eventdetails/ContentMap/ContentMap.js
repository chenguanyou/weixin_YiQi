// pages/index/Eventdetails/ContentMap/ContentMap.js
const app = getApp()
var Api = require("../../../../api/api.js")
var Request = require("../../../../utils/request.js");
var showToast = require("../../../../utils/showToast.js");
var reconstructionArray = require("../../../../utils/reconstructionArray.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    Height: 0,
    latitude: 0,
    longitude: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id
    var address = options.address
    var latitude = options.latitude
    var longitude = options.longitude
    var title = options.title
    that.setData({
      id: id,
      address: address,
      latitude: latitude,
      longitude: longitude,
      title: title,
      markers:[{
        iconPath: '../../../../images/icon/huodong.png',
        id: id,
        latitude: latitude,
        longitude: longitude,
        width: 50,
        height: 50,
        bgColor: "#ffffff",
        padding: "10",
        callout: {
          content: title,
          color: '#ffffff',
          fontSize: 8,
          borderRadius: 10,
          bgColor: '#eb4901',
          padding: 10,
          display: "ALWAYS"
        },
      }]
    })
    // 根据不同的设备设置地图高度全屏
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          Height: res.windowHeight,
          Width: res.screenWidth,
          // 地图放大缩小的控件，定位的控件
          controls: [{
            id: 1,
            iconPath: '../../../../images/icon/map_jia.png',
            position: {
              left: res.screenWidth - 50,
              top: res.windowHeight - 80 - 20,
              width: 40,
              height: 40,
              marginLeft: 20
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '../../../../images/icon/map_jian.png',
            position: {
              left: res.screenWidth - 50,
              top: res.windowHeight - 40 - 20,
              width: 40,
              height: 40,
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '../../../../images/icon/map_jian.png',
            position: {
              left: res.screenWidth - 50,
              top: res.windowHeight - 40 - 20,
              width: 40,
              height: 40,
            },
            clickable: true
          }]
        })
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

  // },
    //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    if (e.controlId === 2) {
      var scale = that.data.scale - 1;
      that.setData({
        scale: scale
      })
    } else {
      var scale = that.data.scale + 1;
      that.setData({
        scale: scale
      })
    }
  },
  regionchange(e) {
    console.log(e.type)
  },
  callouttap(e){
    var that = this;
    that.markertap()
  },
  markertap(e) {
    var that = this;
    // 获取用户当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          user_latitude: res.latitude,
          user_longitude: res.longitude,
        })
        // 调用地图
        console.log(that.data.latitude)
        wx.openLocation({
          name: that.data.title,
          address: that.data.address,
          latitude: parseFloat(that.data.latitude),
          longitude: parseFloat(that.data.longitude),
        })
      }
    })
  },
})