//index.js
//获取应用实例
const app = getApp()
var Api = require("../../api/api.js")
var Request = require("../../utils/request.js");
var showToast = require("../../utils/showToast.js");
var CountDownDate = require("../../utils/CountDownDate.js")
var reconstructionArray = require("../../utils/reconstructionArray.js")
var all_data_list = ''
var ActivityType_list = ''
var timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view_hidden: true,
    SlideImage: '',
    startDateList: '',
    clientHeight: 0,
    startDateListis: true,
    ActivityTypeis: true,
    Registration_datais: true,
    all_datais: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (!app.globalData.jwt) {
      wx.redirectTo({
        url: '../login/login',
      })
      return false
    }
    // 根据不同的设备设置地图高度全屏
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          Height: res.windowHeight,
          Width: res.screenWidth,
        })
      }
    })
    // 根据不同的设备设置地图高度全屏
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          Height: res.windowHeight,
          Width: res.screenWidth,
        })
      }
    })
    // 获取首页图片
    Request.request(Api.IndexSlide, '', 'GET')
      .then(function(res) {
        that.setData({
          SlideImage: res.data
        })
      })

    // 获取分类数据
    setTimeout(function() {
      Request.request(Api.ActivityType, '', 'GET')
        .then(function(res) {
          ActivityType_list = reconstructionArray.reconstructionArray(res.data)
          that.setData({
            ActivityType: ActivityType_list,
            ActivityTypeis: false,
          })
        }, function(error) {});
    }, 200)

    setTimeout(function() {
      // 获取全部数据中的部分数据，前10条
      Request.request(Api.SearchAll, '', 'GET')
        .then(function(res) {
          if (res.statusCode == 403) {
            return false
          }
          if (res.data.results.length != 0) {
            var next = res.data.next
            all_data_list = reconstructionArray.reconstructionArray(res.data.results)
            console.log(res, all_data_list)
            that.setData({
              all_data: all_data_list,
              all_datais: false
            })
          }
        })
    }, 1500)
    setTimeout(function() {
      // 获取热门数据中的部分数据，前4条，
      Request.request(Api.RegistrationAllDataViewSet, '', 'GET')
        .then(function(res) {
          if (res.statusCode == 403) {
            return false
          }
          if (res.data.results.length != 0) {
            var next = res.data.next
            all_data_list = reconstructionArray.reconstructionArray(res.data.results)
            console.log(res, all_data_list)
            that.setData({
              Registration_data: all_data_list,
              Registration_datais: false
            })
          }
        })
    }, 700)
    setTimeout(function() {
      // 获取注册页面分享数据
      Request.request(Api.ActivitySharingViewSet, '', 'GET')
        .then(function(res) {
          that.setData({
            sharing: res.data
          })
        })
    }, 1200)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    setTimeout(function() {
      that.setData({
        view_hidden: '',
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (!app.globalData.jwt) {
      wx.redirectTo({
        url: '../login/login',
      })
      return false
    } else {
      this.setData({
        search_text: ''
      })
      // 即将开始数据
      Request.request(Api.StartAllDataViewSet, '', 'GET')
        .then(function(res) {
          // 计算即将开始
          var start_data = new Array
          var start_date = CountDownDate.CountDownDate(res.data.results[0].startdate)
          start_data.push(res.data.results[0], start_date)
          that.setData({
            startDateListis: false,
            startDateList: [start_data]
          })
          timer = setInterval(function() {
            var start_data = new Array
            var start_date = CountDownDate.CountDownDate(res.data.results[0].startdate)
            start_data.push(res.data.results[0], start_date)
            that.setData({
              startDateList: [start_data]
            })
          }, 1000)
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    clearInterval(timer);
    this.onShow()
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  // // 上拉加载更多
  // loadMore: function () {
  //   console.log('11111111111')
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    var sharedata = reconstructionArray.getRandomArrayElements(that.data.sharing, 1)[0]
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
          .then(function(res) {
            console.LOG(res)
          })
      }
    }
  },
  // 点击更多即将开始
  all_thestart: function() {
    wx.navigateTo({
      url: './allthestart/allthestart',
    })
  },
  // 点击更多热门活动
  allhotactivity: function() {
    wx.navigateTo({
      url: './allhotactivity/allhotactivity',
    })
  },
  // 点击全部活动跳转
  allactivict: function() {
    wx.navigateTo({
      url: './allactivict/allactivict',
    })
  },
  // 点击分类活动
  classification: function() {
    wx.navigateTo({
      url: './classification/classification',
    })
  },
  // 点击进入活动详情
  xiangqing: function(event) {
    var activityid = event.currentTarget.dataset.activityid
    wx.navigateTo({
      url: './Eventdetails/Eventdetails?activityid=' + activityid,
    })
  },
  // 点击搜索
  search_input: function(event) {
    var search_text = event.detail.value
    wx.navigateTo({
      url: './search/search?search_text=' + search_text,
    })
  },
  // 点击地图跳转
  mapmode: function() {
    wx.navigateTo({
      url: './mapmode/mapmode',
    })
  },
  // 点击分类进行跳转
  activity_list: function(event) {
    var that = this
    var classificationsid = event.currentTarget.dataset.classificationsid
    var classificationsname = event.currentTarget.dataset.activityname
    console.log(event)
    wx.navigateTo({
      url: './typeall/typeall?classificationsid=' + classificationsid + '&classificationsname=' + classificationsname,
    })
  }
})