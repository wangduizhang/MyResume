//app.js
App({
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //存储屏幕长度宽度信息
    wx.getSystemInfo({
      success: function(res) {
        wx.setStorageSync('windowHeight', res.windowHeight)
        wx.setStorageSync('windowWidth', res.windowWidth)
      },
    })
  },
})