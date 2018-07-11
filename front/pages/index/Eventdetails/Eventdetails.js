// pages/index/Eventdetails/Eventdetails.js
const app = getApp()
var Api = require("../../../api/api.js")
var Re = require("../../../utils/re.js");
var Request = require("../../../utils/request.js");
var showToast = require("../../../utils/showToast.js");
var reconstructionArray = require("../../../utils/reconstructionArray.js")
var commectionss = require("../../../utils/commends.js")
var content = "1.《为什么要填写姓名联系方式信息？》线上报名，线下联系；填写真实且有效的联系信息更有利于活动的开展，当有用户报名活动时，即可查看您填写的活动信息，以便加入者与您联系，没有加入的用户无法查看您的信息。2.《使用软件应该有哪些限制？》在您使用本软件的同时，请认真且时刻遵守法律法规，应该在法律允许的范围内，如果发起的内容被大量用户举报且违反了相关的法律法规，一经发现，本软件有权限对您发布的内容进行永久删除，并对您进行封号处理！一起哟，让生活不孤单，让兴趣不流浪。祝您使用愉快! "

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharing_views: true,
    showModal: false,
    sharing_view: true,
    hiddenmodalput: true,
    imagePath: "",
    imageTx: "",
    imageEwm: "",
    maskHidden: true,
    showModal: false, //蒙层的显示与否
    aniStyle: true, //动画效果，默认slideup 
    jubaoinput: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var that = this;
    if (!app.globalData.jwt) {
      wx.redirectTo({
        url: '../../login/login',
      })
    }
    var activityid = options.activityid + '/'
    // 获取内容详情
    Request.request(Api.Eventdetails + activityid, '', 'GET')
      .then(function(res) {
        console.log(res)
        if (res.statusCode == 404) {
          showToast.showToast('没有这个活动', 'none')
          setTimeout(function() {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
          return false
        }
        that.setData(res.data)
        if (res.statusCode == 200) {
          wx.getImageInfo({
            src: res.data.cover_image, //服务器返回的带参数的
            success: function(res) {
              //res.path是网络图片的本地地址
              that.setData({
                imageBG: res.path
              })
            },
            fail: function(res) {
              //失败回调
            }
          });
        }
        // 获取浏览用户
        Request.request(Api.BrowseUserViewSet, {
            activityid: options.activityid
          }, 'POST')
          .then(function(res) {})
      })
    // 获取已经报名的用户信息
    Request.request(Api.RegisteredUserViewSet, {
        id: options.activityid
      }, 'GET')
      .then(function(res) {
        that.setData({
          register: res.data
        })
      })
    // 获取当前的活动的评论
    Request.request(Api.CommentsModelsUserViewSet, {
      id: options.activityid
    }, 'GET')
      .then(function (res) {
        that.setData({
          comments: commectionss.Commection(res.data)
        })
      })
    // 绘图开始
    var size = this.setCanvasSize(); //动态设置画布大小
    // 下载二维码
    // 页面初始化 options为页面跳转所带来的参数
    //创建初始化图片
    // 下载图片
    var data = {
      path: 'pages/index/Eventdetails/Eventdetails?activityid=' + options.activityid
    }
    console.log(data)
    Request.request(Api.Qr_Code, data, 'GET')
      .then(function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.getImageInfo({
            src: res.data.qrcode, //服务器返回的带参数的
            success: function(res) {
              //res.path是网络图片的本地地址
              that.setData({
                imageTx: res.path
              })
            },
            fail: function(res) {
              //失败回调
            }
          });
        }
      })

    // 获取用户位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
      }
    })
  },
  outbtn: function(e) { //这是list-fix的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
    var that = this;
    this.setData({
      sharing_view: true //设置动画效果为slidedown
    })
    setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        mengShow: false
      })
    }, 500)
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
    var that = this;
    return {
      title: that.data.title + ' 我在一起呦等你！',
      path: 'pages/index/Eventdetails/Eventdetails?activityid=' + that.data.id,
      imageUrl: that.data.cover_image,
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
  //适配不同屏幕大小的canvas    生成的分享图宽高分别是 750  和940，老实讲不知道这块到底需不需要，然而。。还是放了，因为不写这块的话，模拟器上的图片大小是不对的。。。
  setCanvasSize: function() {
    var that = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      console.log(res)
      var scale = 760; //画布宽度
      var scaleH = 940 / 760; //生成图片的宽高比例
      var width = res.windowWidth; //画布宽度
      var height = res.windowWidth * scaleH + 20; //画布的高度
      size.w = width;
      size.h = height;
      if (res.windowWidth > 400) {
        that.setData({
          bg_x: 1,
          bg_y: 1,
          res_screenHeight: res.screenHeight
        })
      } else {
        that.setData({
          bg_x: 0,
          bg_y: 0,
          res_screenHeight: res.screenHeight
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  // 获取容器高度，使页面滚动到容器顶部
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('.Eventdetails_view').boundingClientRect(function(rect) {
      try {
        // if (rect.height < 500) {
        //   return false
        // }
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: 0
        })
      } catch (err) {}
    }).exec()

  },
  //将2绘制到canvas的固定,活动名称
  settextTitle: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var title = []
    for (var i = 0; i < 10; i++) {
      title.push(that.data.title[i])
    }
    if (that.data.title.length > 10) {
      title.push('...')
    }
    var textFir = that.data.title;
    console.log(textFir);
    context.setFontSize(24);
    context.setTextAlign("center");
    context.setFillStyle("#FFFFFF");
    context.fillText(textFir, size.w / 2, size.h * 0.18);
    context.stroke();
  },
  //将1绘制到canvas的固定
  settextFir: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = "快来和我一起参加吧";
    console.log(textFir);
    context.setFontSize(20);
    context.setTextAlign("center");
    context.setFillStyle("#FFFFFF");
    context.fillText(textFir, size.w / 2.05, size.h * 0.25);
    context.stroke();
  },
  //将2绘制到canvas的固定
  settextSec: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textSec = "长按识别小程序，和我一起";
    context.setFontSize(14);
    context.setTextAlign("center");
    context.setFillStyle("#FFFFFF");
    context.fillText(textSec, size.w / 2.05, size.h * 0.78);
    context.stroke();
  },
  //绘制开始时间到结束时间到canvas的固定
  settextData: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textdata = '开始时间:' + that.data.startdate + '  结束时间:' + that.data.enddate;
    context.setFontSize(12);
    context.setTextAlign("center");
    context.setFillStyle("#FFFFFF");
    context.fillText(textdata, size.w / 2.05, size.h * 0.88);
    context.stroke();
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function() {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    context.setFillStyle('#eb4901')
    context.fillRect(0, 0, size.w, size.h)
    // var path = that.data.imageBG;
    // var imageTx = '../../../images/icon/jubao.png';
    var imageEwm = that.data.imageTx;
    // var imageZw = '../../../images/icon/jubao.png';
    // context.drawImage(path, 0, 0, size.w, size.h);
    // context.drawImage(imageTx, size.w / 2 - 25, size.h * 0.02, size.w * 0.14, size.w * 0.14);
    context.drawImage(imageEwm, size.w / 2 - 60, size.h * 0.36, size.w * 0.33, size.w * 0.33);
    // context.drawImage(imageZw, size.w / 2 - 60, size.h * 0.37, size.w * 0.33, size.w * 0.33);
    this.settextTitle(context);
    this.settextFir(context);
    this.settextSec(context);
    this.settextData(context);

    console.log(size.w, size.h)
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    that.setData({
      sharing_view: '',
    })
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        quality: 1,
        fileType: 'jpg',
        success: function(res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: false,
            maskHidden: true,
          });
        },
        fail: function(res) {
          console.log(res);
        }
      });
    }, 2000);
  },
  // 保存分享图片到本地
  save_shareing_image: function() {
    var that = this;
    var images_path = that.data.imagePath;
    wx.saveImageToPhotosAlbum({
      filePath: images_path,
      success(res) {
        showToast.showToast('保存成功', 'success')
      },
      fail(res) {
        console.log('保存失败')
        that.save_shareing_image()
      }
    })
  },
  // 地址跳转
  ToAddress: function(event) {
    var id = event.currentTarget.dataset.id
    var address = event.currentTarget.dataset.address
    var latitude = event.currentTarget.dataset.latitude
    var longitude = event.currentTarget.dataset.longitude
    var title = event.currentTarget.dataset.title
    console.log(id, address, latitude, longitude)
    wx.navigateTo({
      url: './ContentMap/ContentMap?id=' + id + '&address=' + address + '&latitude=' + latitude + '&longitude=' + longitude + '&title=' + title,
    })
  },
  // 分享跳转
  fenxiang_tap: function() {
    var that = this;
    this.setData({
      showModal: true, //蒙层显示
      aniStyle: true,
      　　　　　　　 //设置动画效果为slideup
    })
    that.pageScrollToBottom()
    wx.showToast({
      title: '正在生成分享码',
      icon: 'loading',
      duration: 3000
    });
    setTimeout(function() {
      that.createNewImg()
    }, 3000)
  },
  // 报名跳转
  baoming_tap: function(event) {
    var that = this;
    var baoming_id = event.currentTarget.dataset.id
    if (that.data.activi_info.activi_info == true) {
      showToast.showToast('您已经报名!', 'none')
      return false
    }
    if (that.data.activi_number.activi_number == false) {
      showToast.showToast('报名人数已满!', 'none')
      return false
    }
    wx.showModal({
      title: '报名协议须知',
      content: content,
      success: function(res) {
        if (res.confirm == true) {
          that.setData({
            baoming_id: baoming_id,
            hiddenmodalput: !that.data.hiddenmodalput
          })
        } else {
          return false
        }
      }
    })
  },
  // 获取报名名称
  baoming_name: function(event) {
    var that = this;
    var baoming_name = event.detail.value
    that.setData({
      baoming_name: baoming_name
    })
  },
  // 获取报名微信
  baoming_wechatid: function(event) {
    var that = this;
    var baoming_wechatid = event.detail.value
    that.setData({
      baoming_wechatid: baoming_wechatid
    })
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认提交报名表单
  confirm: function(event) {
    var that = this;
    var baoming_id = that.data.baoming_id
    var baoming_name = that.data.baoming_name
    var baoming_wechatid = that.data.baoming_wechatid
    // 验证报名信息的正确性
    if (baoming_id == "" || baoming_id == null) {
      showToast.showToast('信息不能为空', 'none')
      return false
    }
    if (baoming_name == "" || baoming_name == null) {
      showToast.showToast('信息不能为空', 'none')
      return false
    }
    if (baoming_wechatid == "" || baoming_wechatid == null) {
      showToast.showToast('信息不能为空', 'none')
      return false
    }
    // 正则验证姓名
    if (!Re.name.test(baoming_name)) {
      showToast.showToast('姓名不正确', 'none')
      return false
    }
    // 正则验证微信号码
    if (!Re.wxreg.test(baoming_wechatid)) {
      showToast.showToast('微信号码不正确', 'none')
      return false
    }
    this.setData({
      hiddenmodalput: true
    })
    // 发送报名记录到服务器
    var data = {
      baoming_id: baoming_id,
      baoming_name: baoming_name,
      baoming_wechatid: baoming_wechatid
    }
    // 获取浏览用户
    Request.request(Api.ActivityUserInfo, data, 'POST')
      .then(function(res) {
        if (res.statusCode == 200) {
          that.setData({
            registration_number: that.data.registration_number + 1
          })
          showToast.showToast(res.data.message, 'success')
        }
        if (res.statusCode == 401) {
          showToast.showToast(res.data.message, 'none')
        }
        that.setData({
          baoming_name: '',
          baoming_wechatid: ''
        })
      })
  },
  // 收藏和取消收藏功能
  ClooectionViewSet: function() {
    var that = this
    var id = that.data.id
    Request.request(Api.ClooectionViewSet, {
        'id': id
      }, 'POST')
      .then(function(res) {
        if (res.statusCode == 200) {
          that.setData({
            callections: {
              'callections': true
            }
          })
          showToast.showToast(res.data.message, 'success')
        }
        if (res.statusCode == 401) {
          that.setData({
            callections: {
              'callections': false
            }
          })
          showToast.showToast(res.data.message, 'success')
        }
      })
  },
  // 获取全部的二维码
  callections_tap: function() {
    var that = this
    if (that.data.groupcode_is.groupcode_is == false) {
      showToast.showToast('报名后可查看', 'none')
      return false
    }
  },
  // 举报活动
  jubaoinput: function() {
    var that = this;
    that.setData({
      jubaoinput: false
    })
  },
  // 获取举报内容
  jubaoinput_content: function(event) {
    var that = this;
    var jubaoinput_content = event.detail.value
    that.setData({
      jubaoinput_content: jubaoinput_content
    })
  },
  //举报取消按钮
  jubaocancel: function() {
    this.setData({
      jubaoinput: true
    });
  },
  // 举报确认按钮
  jubaoconfirm: function() {
    var that = this;
    var id = that.data.id
    var jubaoinput_content = that.data.jubaoinput_content
    if (jubaoinput_content == '' || jubaoinput_content == null || Re.rekongge.test(jubaoinput_content)) {
      showToast.showToast('请输入您的举报理由', 'none')
      return false
    }
    var data = {
      id: id,
      jubaoinput_content: jubaoinput_content
    }
    Request.request(Api.ReportionViewSet, data, 'POST')
      .then(function(res) {
        if (res.statusCode == 200) {
          showToast.showToast(res.data.messages, 'success')
          that.setData({
            jubaoinput_content: '',
            jubaoinput: true
          })
        } else {
          showToast.showToast(res.data.messages, 'none')
        }
      })
  },
  // 跳转到活动详情页面
  hdDdetails: function() {
    var that = this;
    var id = that.data.id
    wx.navigateTo({
      url: './details/details?id=' + id,
    })
  },
  // 全部的报名用户
  baominguser_tap: function() {
    var that = this;
    var id = that.data.id
    wx.navigateTo({
      url: './reguser/reguser?id=' + id,
    })
  },
  // 点击查看二维码
  erweima_cat: function (event) {
    var that = this;
    that.pageScrollToBottom()
    that.setData({
      sharing_views: false,
      showModal: true,
    })
  },
  // 点击隐藏
  outbtns: function () {
    var that = this;
    that.setData({
      sharing_views: true,
      showModal: false
    })
  },
  // 群聊
  qunliao:function(event){
    showToast.showToast('下个版本见', 'none')
  }
})