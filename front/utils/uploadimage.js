function uploadImage(num) {
  var get_data = new Promise(function(resolve, reject) {
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: resolve
    })
  })
  return get_data
}

module.exports = {
  uploadImage: uploadImage
}