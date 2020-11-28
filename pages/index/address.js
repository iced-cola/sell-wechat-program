// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        params: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _that = this;
        var params = options;
        _that.setData({
            params: params
        });
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

    toPay: function() {
        // 生成 8 位随机数
        var nonceStr = Math.random().toString(36).slice(8);
        payId = "test_pay_id";
        // 发起支付
        wx.requestPayment({
          nonceStr: nonceStr,
          package: payId,
          paySign: 'paySign',
          singType: 'MD5',
          timeStamp: '',
          success: function(res) {
              console.log("支付成功！");
          },
          fail: function(res) {
              console.log("支付成功！");
          },
          complete: function(res) {
            // 不论成功或失败都会执行
            
          }
        });
    },
})
