// pages/user/Advicefeedback/Advicefeedback.js
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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback_post: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function() {

  },
  // 获取反馈标题title内容
  title: function(event) {
    var that = this;
    var title = event.detail.value
    that.setData({
      title: title
    })
  },
  // 获取建议反馈内容
  content: function(event) {
    var that = this;
    var content = event.detail.value
    that.setData({
      content: content
    })
  },
  // 获取图片
  UploadImage: function() {
    var that = this
    UploadImage.uploadImage(1)
      .then(function(res) {
        that.setData({
          imagestempFilePaths: res.tempFilePaths[0]
        })
      })
  },
  // 进行数据提交
  feedback_post: function() {
    var that = this;
    var title = that.data.title
    var content = that.data.content
    var imagestempFilePaths = that.data.imagestempFilePaths
    console.log(title, content, imagestempFilePaths)
    // 进行数据验证
    if (Re.rekongge.test(title) || title == '' || title == null) {
      showToast.showToast('不能为空或包含多个空格', 'none')
      return false
    }
    if (Re.rekongge.test(content) || content == '' || content == null) {
      showToast.showToast('不能为空或包含多个空格', 'none')
      return false
    }
    var dataForm = {
      title: title,
      content: content
    }
    that.setData({
      feedback_post: true
    })
    if (imagestempFilePaths == null) {
      Request.request(Api.FeedBackViewSet, dataForm, 'POST')
        .then(function(res) {
          if (res.statusCode == 200) {
            that.deletes()
            showToast.showToast(res.data.messages, 'success')
          }
        })
    } else {
      // 照片不是空的情况下
      UpImages.UpImages(Api.FeedBackViewSet, imagestempFilePaths, dataForm)
        .then(function(res) {
          if (res.statusCode == 200) {
            that.deletes()
            showToast.showToast('反馈成功', 'success')
          }
        })
    }
  },
  // 清空反馈内容
  deletes: function() {
    var that = this;
    that.setData({
      imagestempFilePaths: null,
      title: '',
      content: '',
      feedback_post: false,
    })
  }
})