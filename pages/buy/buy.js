Page({
  callMe(event){
    wx.makePhoneCall({
      phoneNumber: '18454343991'
    })
  },
  // 触摸开始时间
  touchStartTime: 0,
  // 触摸结束时间
  touchEndTime: 0,
  // 最后一次单击事件点击发生时间
  lastTapTime: 0,
  // 单击事件点击后要触发的函数
  lastTapTimeoutFunc: null, 
  /// 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  
  /// 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  //双击
  doubleTap: function (e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        wx.showActionSheet({
          itemList: ['快递', '地图', '天气','游戏'],
          success: function (res) {
            switch (res.tapIndex){
              case 0:
                console.log(res.tapIndex)
                wx.navigateTo({
                  url: '../express/express',
                })
                break;
              case 1:
                console.log(res.tapIndex)
                wx.navigateTo({
                  url: '../map/map',
                })
                break;
              case 2:
                console.log(res.tapIndex)
                wx.navigateTo({
                  url: '../weather/weather',
                })
                break;
              case 3:
                console.log(res.tapIndex)
                wx.showActionSheet({
                  //游戏列表
                  itemList: ['贪吃蛇'],
                  success: function(res){
                    switch(res.tapIndex){
                      case 0:
                        console.log(res.tapIndex)
                        wx.navigateTo({
                          url: '../snake/snake',
                        })
                      break;
                    }
                  }
                })
                break;
            }
            
          }
        })

      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 100)
    //屏幕尺寸
    var width = wx.getStorageSync('windowWidth')
    var height = wx.getStorageSync('windowHeight')
    this.setData({ backwidth: width + 'px'})
    this.setData({ backheight: height / 3.5 + 'px' })
    this.setData({ ttheight: height * 5 / 13 + 'px' })
    this.setData({ infoheight: height / 3.5 + 'px' })
    this.setData({ infowidth: width / 1.2+ 'px' })
    this.setData({ telwidth: width / 1.1 + 'px' })
    this.setData({ telheight: height / 13 + 'px' })
    this.setData({ infotop: '-' + (height) / 2.5 + 'px' })
    this.setData({ center: height / 70+ 'px' })
    this.setData({ adwidth: height / 4.5 + 'px' })
    this.setData({ adheight: height / 4.5 + 'px' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})