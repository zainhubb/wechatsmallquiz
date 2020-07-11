// miniprogram/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    pagenum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdz(this.data.pagenum)
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
    this.setData({pagenum:this.data.pagenum+1})
    this.getdz(this.data.pagenum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getdz(page){
    let that = this
    wx.cloud.callFunction({
      name:"demo",
      data:{
        page: page,
        count: 10,
        type: "text"
      },
      success(res){
        let arr = that.data.datalist.concat(res.result.result)
        that.setData({
          datalist:arr
        })
      }
    })
  }
})