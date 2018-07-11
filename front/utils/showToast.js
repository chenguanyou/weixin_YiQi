function showToast(title, icon) {
  wx.showToast({
    title: title,
    icon: icon
  })
}
module.exports = {
  showToast: showToast
}