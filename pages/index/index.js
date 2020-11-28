//index.js
//获取应用实例

const app = getApp()
const openid_url = "https://api.weixin.qq.com/sns/jscode2session"
var openid = ''

var utils = require('../../utils/util.js')

Page({

  data: {
    order: [],
    total2Pay: 0,
    productCount: 0,
    category: [],
    product: []
  },

  onLoad(options) {
    var _that = this;
    // 登录
    wx.login({
      success: function (res) {
        // 获取code
        var code = res.code;
        var param = {
          appid: 'wxb8da1fa882588b78',
          secret: '',
          js_code: code,
          grant_type: 'authorization_code'
        };
        wx.request({
          url: openid_url,
          param: param,
          success: function (e) {
            // 得到用户的 openid
            openid = e.data.openid;
          }
        });
        _that.init();
      },
      fail: function () {
        console.log("登录错误！");
      }
    });
  },

  init() {
    var _that = this;
    wx.request({
      url: 'http://localhost:8080/init',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data.data;
        let categoryList = data.categoryList;
        if (categoryList !== undefined && categoryList !== null && categoryList.length > 0) {
          var categoryData = [];
          for (var index = 0; index < categoryList.length; index++) {
            var categoryItem = {
              name: categoryList[index]
            };
            categoryData.push(categoryItem);
          }
          _that.setData({
            category: categoryData
          });
        }

        let productInfoList = data.productInfoList;
        if (productInfoList !== undefined && productInfoList !== null && productInfoList.length > 0) {
          var productData = [];
          for (var index = 0; index < productInfoList.length; index++) {
            productInfoList[index].count = 0;
            productData.push(productInfoList[index]);
          }
          _that.setData({
            product: productData
          });
        }
      },
      error: function (res) {
        console.log(res);
      }
    });
  },

  subtract: function (event) {
    var _that = this;
    var id = event.currentTarget.dataset.id;
    var order = _that.data.order;
    var productCount = _that.data.productCount;
    var productList = _that.data.product;
    for (var i = 0; i < order.length; i++) {
      if (order[i].id === id && order[i].count > 0) {
        order[i].count--;
        productCount--;
        break;
      }
    }

    for (var i = 0; i < productList.length; i++) {
      if (productList[i].productId === id && productList[i].count > 0) {
        productList[i].count--;
        break;
      }
    }

    _that.setData({
      order: order,
      product: productList,
      productCount: productCount,
      total2Pay: _that.calculatePrice()
    });
  },

  add: function (event) {
    var _that = this;
    var id = event.currentTarget.dataset.id;
    var order = _that.data.order;
    var productList = _that.data.product;
    if (order.length <= 0) {
      order.push({
        id: id,
        count: 1
      });
    } else {
      var flag = false;
      for (var i = 0; i < order.length; i++) {
        if (order[i].id === id) {
          order[i].count++;
          flag = true;
          break;
        }
      }
      if (flag !== true) {
        order.push({
          id: id,
          count: 1
        });
      }
    }
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].productId === id) {
        productList[i].count = productList[i].count + 1;
        break;
      }
    }

    _that.setData({
      order: order,
      product: productList,
      productCount: _that.data.productCount + 1,
      total2Pay: _that.calculatePrice()
    });
  },

  getInputValue: function (e) {
    return e.detail.value;
  },

  calculatePrice: function () {
    var _that = this;
    var totalPrice = 0.00;
    var order = _that.data.order;
    console.log("order: ", order);
    var productList = _that.data.product;
    for (var i = 0; i < order.length; i++) {
      for (var j = 0; j < productList.length; j++) {
        if (order[i].id === productList[j].productId) {
          totalPrice = utils.accAdd(totalPrice, utils.accMul(order[i].count, productList[j].productPrice));
          break;
        }
      }
    }

    return totalPrice;
  },

  toCompleteAddress: function (event) {
    var _that = this;
    var orderParam = JSON.stringify(_that.data.order);
    // 跳转到收货信息填写页面
    wx.navigateTo({
      url: './address?order=' + orderParam + '&openid=' + openid
    });
  }

})