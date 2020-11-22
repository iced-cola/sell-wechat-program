//index.js
//获取应用实例
const app = getApp()

const res = {
  category: [
    {
      name: "一月榜单"
    },
    {
      name: "二月榜单"
    },
    {
      name: "三月榜单"
    },
    {
      name: "四月榜单"
    }
  ],
  dishes: [
    {
      name: "喷射汉堡",
      price: "12.50",
      image: "https://tse1-mm.cn.bing.net/th/id/OIP.4SprAoWjJCk0abjOlnl8fwHaFo",
      desc: "包你喷射的汉堡！"
    },
    {
      name: "百事洁厕灵",
      price: "3.00",
      image: "https://cbu01.alicdn.com/img/ibank/2016/513/019/3335910315_489187494.220x220.jpg",
      desc: "百事洁厕灵商品说明"
    }
  ]
}

Page({

  data: {

  },

  onLoad(options) {
    this.getCategory()
  },

  getCategory() {
    this.setData(res)
  }

})
