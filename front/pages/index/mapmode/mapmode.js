// pages/index/mapmode/mapmode.js
const app = getApp()
var Api = require("../../../api/api.js")
var Request = require("../../../utils/request.js");
var showToast = require("../../../utils/showToast.js");
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var markers = new Array;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    Height: 0,
    latitude: "",
    longitude: "",
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    var activityid = e.markerId
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
  callouttap(e) {
    var activityid = e.markerId
    wx.navigateTo({
      url: '../Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
            iconPath: '../../../images/icon/map_jia.png',
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
            iconPath: '../../../images/icon/map_jian.png',
            position: {
              left: res.screenWidth - 50,
              top: res.windowHeight - 40 - 20,
              width: 40,
              height: 40,
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '../../../images/icon/map_jian.png',
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
    // 获取用户当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          user_latitude: res.latitude,
          user_longitude: res.longitude,
        })
      }
    })
    Request.request(Api.MapModelAllDateViewSet, '', 'GET')
      .then(function(ress) {
        var data_list = ress.data
        console.log(ress)
        for (var i = 0; i < data_list.length; i++) {
          markers.push({
            iconPath: '../../../images/icon/huodong.png',
            id: data_list[i].id,
            latitude: data_list[i].latitude,
            longitude: data_list[i].longitude,
            width: 30,
            height: 30,
            bgColor: "#ffffff",
            padding: "10",
            callout: {
              content: data_list[i].title,
              color: '#ffffff',
              fontSize: 8,
              borderRadius: 10,
              bgColor: '#eb4901',
              padding: 6,
              display: "ALWAYS"
            },
          })
          that.setData({
            markers: markers
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    markers = new Array;
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
  }
})