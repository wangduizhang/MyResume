var util = require('../../utils/util.js')
var baidu = require('../../lib/bmap-wx.min.js')

Page({
  setLoc(){
    this.setData({ locico: 'images/locdown.png' })
  },
  setUp(event) {
    this.setData({ locico: 'images/locdown.png' })
    //获取定位权限
    wx.openSetting({
      success: (res) => {
        this.onReady()
      }
    })
    //重新载入天气
    this.setData({ locico: 'images/locup.png' })
  },

  /**
   * 页面的初始数据
   */
  data: {
    weather_background:'images/1.jpg',
    weatherData: '',
    locico:'images/locup.png',
    fontsize:'100%'
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
    }, 500)
    //console.log('onLoad')
    //日期获取
    var date = util.formatTime2(new Date)
    //console.log(date)
    this.setData({Date:date})
    //自适应屏幕
    var width = wx.getStorageSync('windowWidth')
    var height = wx.getStorageSync('windowHeight')
  //当天预报
    //this.setData({top_width: width+'px'})
    this.setData({top_height: height/2.2 + 'px'})
      //城市 定位 日期
      //this.setData({ head_height: height / 6 + 'px' })
      this.setData({ head_width: width + 'px' })
        //城市 定位
        this.setData({ city_loc_height: height / 8 + 'px' })
        this.setData({ city_loc_width: width / 5 + 'px' })
        //日期
        this.setData({ n_d_height: height / 8 + 'px' })
        this.setData({ n_d_width: width / 1.8 + 'px' })
      //天气图标
      this.setData({ head_ico_height: height / 6 + 'px' })
      this.setData({ head_ico_width: width + 'px' })
      //今日详细天气状况
      this.setData({ f_i_height: height / 14 + 'px' })
      this.setData({ f_i_width: width/2.1 + 'px' })
      //今日详细天气状况(小标)
      this.setData({ i_height: height / 14 + 'px' })
      this.setData({ i_width: height / 14 + 'px' })
  //三天预报
    this.setData({bot_width: width + 'px'})
    //this.setData({bot_height: height / 2 + 'px'})
      //温度
      this.setData({ n_height: height / 20 + 'px' })
      this.setData({ n_t_width: width/4 + 'px' })
      //时间日期
      this.setData({ n_ico_width: width/8  + 'px' })
      //天气状况
      this.setData({ n_ico_width: width/1.6  + 'px' })
      //wx.setStorageSync('city', "tianijin")
      //console.log(wx.getStorageSync('city'))
      if(!wx.getStorageSync('city')){
        wx.setStorageSync('city', "北京市")
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var city = wx.getStorageSync('city')
    //console.log(city)
    this.setData({city: city})
      /**天气查询 */
      var that = this;
      // 新建百度地图对象
      var BMap = new baidu.BMapWX({
        ak: '29FfshkrPzegKEkytK4bXMD7EGhGgGxZ'
      });
      var fail = function (data) {
        that.setData({ 
          temp : '（可能未授予定位权限）\n 点击右上角尝试开启权限',
          fontsize : '100%'
        })
      };
      var success = function (data) {
        var weatherData = data.currentWeather[0];
        that.setData({
          city: weatherData.currentCity,
          fontsize : '280%'
          })
        wx.setStorageSync('city', weatherData.currentCity)
        //console.log(weatherData.currentCity)
        var arr = weatherData.date.split('：')
        var now_t = arr[1]
        now_t = now_t.replace(')', '')
        //console.log(st_long)
        that.setData({ temp: now_t })
        //console.log(now_t)
        that.setData({ tt: weatherData.temperature })
        that.setData({ ii: weatherData.weatherDesc })
        that.setData({ pm: weatherData.pm25 })
        that.setData({ ww: weatherData.wind })
        //var futureWeather = data.originalData.results[0].weather_data 
        //console.log(weatherData)
        //console.log(data.originalData.results[0].weather_data)
        //未来三天
        for (var i = 1; i < 4; i++) {
          weatherData = data.originalData.results[0].weather_data[i]
          //console.log(weatherData)
          var dd = 'date' + i
          var ii = 'info' + i
          var tt = 'temp' + i
          that.setData({
            [dd]: weatherData.date,
            [ii]: weatherData.weather + ' | ' + weatherData.wind,
            [tt]: weatherData.temperature
          })
        }
      }
      // 发起weather请求
      BMap.weather({
        fail: fail,
        success: success
      });
  
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