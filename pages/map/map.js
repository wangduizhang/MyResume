// map.js
Page({
  controltap(e) {
    var that = this;
    if (e.controlId === 1) {
      wx.openSetting({
        success: (res) => {
          wx.redirectTo({
            url: '../map/map',
          })
        }
      })
    }
  },
  data: {

  },
  onLoad:function(options){
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
    },
    })
    //屏幕尺寸
    var height = 0
    var width = 0
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth
        height = res.windowHeight
        that.setData({
          width: width,
          height: height,
          controls: [{
            id: 1,
            iconPath: 'images/location.png',
            position: {
              left: 15,
              top: 10,
              width: 35,
              height: 35
            },
            clickable: true
          },
          ],
        })
      },
    })
  },
})