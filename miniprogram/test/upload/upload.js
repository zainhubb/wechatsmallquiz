// miniprogram/test/upload.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgsrc:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },
    imgupload(){
        let that = this
        wx.chooseImage({
            count:1,
            success: function(res){
                console.log(res),
                //如果选择图片成功则下一步开始上传文件
                wx.cloud.uploadFile({
                    cloudPath: new Date().getDate()+".png",//图片在云端保存的路径
                    filePath:res.tempFilePaths[0],//文件在当前设备的路径
                    success(result){
                        console.log(result)
                        that.setData({
                            imgsrc: result.fileID
                        })
                    }
                })
            },
            fail(error){
                console.log(error)
            }
            
        })
    }
})