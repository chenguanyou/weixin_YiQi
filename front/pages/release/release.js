// pages/release/release.js
const app = getApp()
var Request = require("../../utils/request.js");
var UploadImage = require("../../utils/uploadimage.js");
var thatDate = require("../../utils/thatdate.js");
var showToast = require("../../utils/showToast.js");
var UpImages = require("../../utils/UpImages.js")
var Re = require("../../utils/re.js");
var Api = require("../../api/api.js")
var content_add_images_num = 9
var xieyuyuedu = 0
var content = "1.《为什么要填写姓名联系方式信息？》线上报名，线下联系；填写真实且有效的联系信息更有利于活动的开展，当有用户报名您发起的活动时，即可查看您填写的活动信息，以便加入者与您联系，没有加入的用户无法查看您的信息，活动群二维码用于活动的交流与联系。2.《发起活动及内容应该有哪些限制？》在您使用本软件的同时，请认真且时刻遵守法律法规，在您发布活动内容的时候，应该在法律允许的范围内，如果发起的内容被大量用户举报且违反了相关的法律法规，一经发现，本软件有权限对您发布的内容进行永久删除，并对您进行封号处理！一起哟，让生活不孤单，让兴趣不流浪。祝您使用愉快! "

var the_content_add_images = new Array;

var the_cover_path = '../../images/icon/addtop.png'
var qr_images_path = '../../images/icon/addtianjia.png'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    release_type: '',
    address_name: '添加活动地点',
    the_cover: the_cover_path,
    the_cover_view_text: '',
    the_content_add_images1: 'true',
    the_content_add_images2: '',
    the_content_add_images_num: 0,
    qr_images: qr_images_path,
    get_initiate: true,
    the_content_title: '',
    the_content_content: ''
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
    }
    // 获取分类数据
    Request.request(Api.ActivityType, '', 'GET')
      .then(function(Request) {
        that.setData({
          ActivityType: Request.data,
          release_type: Request.data[0].name,
          typeid: Request.data[0].id,
        })
      }, function(error) {});
    var date = thatDate.formatTime(new Date)
    that.setData({
      printdate: date,
      startdate: date,
      enddate: date
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
    xieyuyuedu = 0
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
    xieyuyuedu = 0
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
  // 活动区域地址
  address: function(event) {
    var that = this;
    // 获取当前位置,用于地址选择
    wx.chooseLocation({
      type: 'wgs84',
      success: function(res) {
        var address_name = res.address.substring(0, 8)
        that.setData({
          xiangxi_diqu: res.address,
          address_name: address_name,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    });
  },
  // 获取活动类别
  release_type: function(event) {
    var that = this;
    var typeids = event.detail.value;
    var typeid = that.data.ActivityType[event.detail.value].id;
    var release_type = that.data.ActivityType[typeids].name
    that.setData({
      release_type: release_type,
      typeid: typeid
    })
  },
  // 上传封面
  UploadImage_tap: function() {
    var that = this
    UploadImage.uploadImage(1)
      .then(function(image_path) {
        that.setData({
          the_cover: image_path.tempFilePaths[0],
          the_cover_view_text: true,
          the_cover_wigth: 100
        })
      })
  },
  // 获取活动标题
  the_content_title: function(event) {
    var that = this
    var the_content_title = event.detail.value
    that.setData({
      the_content_title: the_content_title,
    })
  },
  // 获取活动内容
  the_content_content: function(event) {
    var that = this;
    var the_content_content = event.detail.value
    that.setData({
      the_content_content: the_content_content
    })
  },
  // 获取活动图片
  the_content_add_images: function() {
    var that = this
    UploadImage.uploadImage(content_add_images_num)
      .then(function(image_list) {
        for (var i = 0; i < image_list.tempFilePaths.length; i++) {
          the_content_add_images.push(image_list.tempFilePaths[i])
        }
        that.setData({
          the_content_add_images: the_content_add_images,
          the_content_add_images1: '',
          the_content_add_images_num: the_content_add_images.length
        })
        content_add_images_num -= image_list.tempFilePaths.length;
        if (the_content_add_images.length >= 9) {
          that.setData({
            the_content_add_images2: true
          })
        }
      })
  },
  // 点击删除图片
  deleteImage: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          the_content_add_images.splice(index, 1);
          that.setData({
            the_content_add_images: the_content_add_images,
            the_content_add_images_num: the_content_add_images.length
          })
          content_add_images_num = 9
          content_add_images_num -= the_content_add_images.length
        } else if (res.cancel) {
          return false;
        }
        if (the_content_add_images.length < 9) {
          that.setData({
            the_content_add_images2: ''
          })
        }
      }

    })
  },
  // 点击预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;
    var image_num = e.target.dataset.index
    var imagess = new Array()
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: the_content_add_images
    })
  },
  // 获取活动开始时间
  bindDateChangess1: function(event) {
    var that = this;
    var startdate = event.detail.value

    that.setData({
      startdate: startdate
    })
  },
  // 获取活动结束时间
  bindDateChangess2: function(event) {
    var that = this;
    var enddate = event.detail.value
    that.setData({
      enddate: enddate
    })
  },
  // 获取限制人数
  number2: function(event) {
    var that = this;
    var number2 = event.detail.value
    that.setData({
      number2: number2
    })
  },
  // 发起人名称
  this_name: function(event) {
    var that = this;
    var that_name = event.detail.value
    that.setData({
      that_name: that_name
    })
  },
  // 发起人微信号
  that_wechat: function(event) {
    var that = this;
    var that_wechat = event.detail.value
    that.setData({
      that_wechat: that_wechat
    })
  },
  // 活动群二维码
  qr_images: function() {
    var that = this
    UploadImage.uploadImage(1)
      .then(function(image_path) {
        that.setData({
          qr_images: image_path.tempFilePaths[0]
        })
      })
  }, // 点击阅读协议
  yuedu: function() {
    var that = this
    wx.showModal({
      title: '使用协议',
      content: content,
      showCancel: false,
      confirmText: '我已阅读',
      confirmColor: '#eb4901'
    })
  },
  checkboxChange: function() {
    var that = this;
    if (xieyuyuedu == 0) {
      xieyuyuedu = 1
      that.setData({
        get_initiate: false
      })
      return false
    }
    if (xieyuyuedu == 1) {
      xieyuyuedu = 0
      that.setData({
        get_initiate: true
      })
      return false
    }
  },
  //点击发布活动 
  Launch_event: function() {
    var that = this;
    // 获取全部的数据并且进行验证
    var the_cover = that.data.the_cover //获取封面
    var the_content_title = that.data.the_content_title //获取活动标题
    var the_content_content = that.data.the_content_content //获取活动内容
    var the_content_add_images = that.data.the_content_add_images //获取活动图片
    var startdate = that.data.startdate //获取活动开始时间
    var enddate = that.data.enddate //获取活动结束时间
    var xiangxi_diqu = that.data.xiangxi_diqu //获取位置
    var latitude = that.data.latitude //获取纬度
    var longitude = that.data.longitude //获取经度
    var release_type = that.data.release_type //获取类别名称
    var typeid = that.data.typeid //获取类别ID
    var number2 = that.data.number2 //获取限制人数
    var that_name = that.data.that_name //获取发起人真实姓名
    var that_wechat = that.data.that_wechat //获取发起人的微信
    var qr_images = that.data.qr_images //获取发起人的群二维码

    // 判断封面图是否存在
    if (the_cover == the_cover_path || the_cover == "" || the_cover == null) {
      showToast.showToast('请上传活动封面图', 'none')
      return false
    }
    // 判断活动标题
    if (the_content_title == '' || the_content_title == null || Re.rekongge.test(the_content_title)) {
      showToast.showToast('请输入活动标题', 'none')
      return false
    }

    // 判断活动内容是否为空
    if (the_content_content == '' || the_content_content == null || Re.rekongge.test(the_content_content)) {
      showToast.showToast('请输入活动内容', 'none')
      return false
    }

    // 判断图片是否为9张
    if (the_content_add_images == null || the_content_add_images == '') {
      showToast.showToast('请上传活动图片', 'none')
      return false
    } else {
      if (the_content_add_images.length > 9) {
        showToast.showToast('图片不能大于9张', 'none')
        return false
      }
    }
    // 判断开始时间
    if (startdate == '' || startdate == null) {
      enddate.showToast('开始时间不能为空', 'none')
      return false
    }
    // 判断结束时间
    if (startdate == '' || startdate == null) {
      showToast.showToast('结束时间不能为空', 'none')
      return false
    }
    // 判断详细地区是否为空
    if (xiangxi_diqu == null || xiangxi_diqu == "") {
      showToast.showToast('请选择活动地点', 'none')
      return false
    }
    // 判断活动类别
    if (release_type == null || release_type == "") {
      showToast.showToast('请选择活动类别', 'none')
      return false
    }
    // 判断限制人数
    if (number2 == null || number2 == '') {
      showToast.showToast('请输入限制人数', 'none')
      return false
    }
    // 判断限制人数
    if (!Re.integer.test(number2)) {
      showToast.showToast('限制人数为整数', 'none')
      return false
    }
    // 判断姓名
    if (that_name == null || that_name == "") {
      showToast.showToast('请输入真实姓名', 'none')
      return false
    }
    // 正则验证微信号码
    if (!Re.name.test(that_name)) {
      showToast.showToast('姓名不正确', 'none')
      return false
    }
    // 请输入微信号码
    if (that_wechat == null || that_wechat == "") {
      showToast.showToast('请输入微信号码', 'none')
      return false
    }
    // 正则验证微信号码
    if (!Re.wxreg.test(that_wechat)) {
      showToast.showToast('微信号码不正确', 'none')
      return false
    }
    // 判断群二维码是不是为空
    if (qr_images == qr_images_path || qr_images == null || qr_images == "") {
      qr_images = null
    }
    // 活动内容保存到服务器, 先进行普通文本数据的保存，然后返回活动ID, 拿到活动ID进行活动图片的保存，

    // 活动文本数据
    var data = {
      TYPE: 'TEXT',
      activitytype_id: typeid,
      limitnum: number2,
      enddate: enddate,
      latitude: latitude,
      startdate: startdate,
      username: that_name,
      longitude: longitude,
      wechat: that_wechat,
      address: xiangxi_diqu,
      activitytype: release_type,
      title: the_content_title,
      content: the_content_content,
    }

    // 活动图片二进制数据
    var data_image = {
      qr_images: qr_images,
      the_cover: the_cover,
      the_content_add_images: the_content_add_images,
    }

    // 进行文本内容的保存
    Request.request(Api.UploadTextDateView, data, 'POST')
      .then(function(Request) {
        if (Request.statusCode == 200) {
          var formData = {
            TYPE: 'BINARY_FM',
            id: Request.data.id
          }
          // 保存封面图片
          UpImages.UpImages(Api.UploadTextDateView, the_cover, formData)
            .then(function(Request) {})
          // 保存活动图片
          for (var i = 0; i < the_content_add_images.length; i++) {
            var formData1 = {
              TYPE: 'BINARY_HD',
              id: Request.data.id,
              len: i
            }
            UpImages.UpImages(Api.UploadTextDateView, the_content_add_images[i], formData1)
              .then(function(Request) {})
          }
          // 如果群二维码不为空的时候保存
          if (qr_images != null) {
            var formData2 = {
              TYPE: 'BINARY_QR',
              id: Request.data.id
            }
            UpImages.UpImages(Api.UploadTextDateView, qr_images, formData2)
              .then(function(Request) {})
          }
          showToast.showToast('活动审核中', 'success')
          // 清空值
          that.setData({
            release_type: '',
            address_name: '添加活动地点',
            the_cover: the_cover_path,
            the_cover_view_text: '',
            the_content_add_images1: 'true',
            the_content_add_images2: '',
            the_content_add_images_num: 0,
            qr_images: qr_images_path,
            the_content_title: '',
            the_content_content: '',
            number2: '',
            that_name: '',
            that_wechat: '',
            the_cover_wigth: ''
          })
          that.onLoad();
        }
        if (Request.statusCode == 401) {
          showToast.showToast('发布失败', 'none')
        }
      }, function(error) {});
  }
})