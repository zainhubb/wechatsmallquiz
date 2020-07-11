// miniprogram/test/db/db.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.addDb("dbtest")
        // this.getDb("dbtest")
        // this.queryDb("dbtest")
        // this.updateDb("dbtest")
        // this.deleteDb("dbtest")
        // this.deleteDb2()
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
    // //封装选择数据库函数
    
    selectDb(dbname){
        return wx.cloud.database().collection(dbname)
    },
    addDb(dbname){
        let db = this.selectDb(dbname)
        db.add({
            data:{
                name:"lareina",
                age:20,
                sex:"female"
            }
        })
    },
    async getDb(dbname){
        let db = this.selectDb(dbname)
        let result = await db.get()
        console.log(result);
    },
    async queryDb(dbname){
        let db = this.selectDb(dbname)
        let result = await db.where({
            age:wx.cloud.database().command.lt(22)
        }).get()
        console.log(result);
    },
    updateDb(dbname){
        let db = wx.cloud.database().collection(dbname)
        db.doc("a81822d65efc2a2c0016cfb270922547").update({
            data:{
                name:"kikomizuhara"
            }
        })
    },
    deleteDb(dbname){
        let db = this.selectDb(dbname)
        db.doc("a81822d65efc2a2c0016cfb270922547").remove()
    },
    deleteDb2(){
        wx.cloud.callFunction({
            name:"delDb"
        })
    }
})