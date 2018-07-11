const app = getApp()

// 封装网络请求模块
function Request(url, data = {}, method) {
  var url = url
  var data = data
  var method = method
  if (method == 'GET') {
    var get_data = new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        header: {
          'Authorization': 'JWT ' + app.globalData.jwt // 默认值
        },
        method: method,
        data: data,
        success: resolve
      })
    })
    return get_data
  }
  if (method == 'POST') {
      var post_data = new Promise(function (resolve, reject) {
        wx.request({
          url: url,
          header: {
            'Authorization': 'JWT ' + app.globalData.jwt // 默认值
          },
          method: method,
          data:data,
          success: resolve
        })
      })
      return post_data
  }
}



module.exports = {
  request: Request,
}