//index.js
//获取应用实例
const app = getApp()

const res = {
  category: [
    {
      name: "主食"
    },
    {
      name: "小食"
    },
    {
      name: "饮品"
    },
    {
      name: "调料"
    }
  ],
  dishes: [
    {
      id: "A0001",
      name: "登月汉堡",
      price: "12.50",
      image: "https://tse1-mm.cn.bing.net/th/id/OIP.4SprAoWjJCk0abjOlnl8fwHaFo",
      desc: "包你喷射的汉堡！"
    },
    {
      id: "B0001",
      name: "百事洁厕灵",
      price: "3.00",
      image: "https://cbu01.alicdn.com/img/ibank/2016/513/019/3335910315_489187494.220x220.jpg",
      desc: "百事洁厕灵商品说明"
    }
  ]
}

Page({

  data: {
    order: [
      {
        id: "A0001",
        count: 0
      },
      {
        id: "B0001",
        count: 0
      }
    ]
  },

  onLoad(options) {
    this.getCategory()
  },

  getCategory() {
    this.setData(res)
  },

  subtract: function(event) {
    var _that = this;
    var index = event.currentTarget.dataset.index;
    var order = _that.data.order;
    if (order[index].count <= 0) {
      return;
    }
    order[index].count = order[index].count - 1;
    _that.setData({
      order: order
    });
    console.log("order: ", _that.data.order);
  },

  add: function(event) {
    var _that = this;
    var index = event.currentTarget.dataset.index;
    var order = _that.data.order;
    var count = order[index].count + 1;
    order[index].count = count;
    _that.setData({
      order: order
    });
    console.log("order: ", _that.data.order);
  },

  getInputValue: function(e) {
    return e.detail.value;
  }

})
