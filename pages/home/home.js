// pages/home/home.js
import http from '../../utils/http'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    brandList:[],
    goodsList:[],
    params:{
      group_id:4,
      count:4,
      offset:0
    },
    canReachBottomRefresh:true,
    // list:[1,2,3,45,5],
    // images:['../../image/1.jpg','../../image/2.jpg','../../image/3.jpg',
    // ]
  },
  onLoad:function(options){
    this.getSwiperData();
    this.getBrandList();
    this.getGoodsList();
  },

  async getSwiperData(){
    const {list}= await http.get('getAdInfoList',{count:10,offset:0});
    this.setData({
      swiperList:list
    });
  },

  async getBrandList(){
    let {list}= await http.get('getBrandList',{count:10,offset:0});
    this.setData({
      brandList:list
    });
    console.log('品牌数据',list)
  },
  async getGoodsList(){
    let {list}= await http.get('getGoodsGroupSpuList',this.data.params);
    this.setData({
      canReachBottomRefresh:list.length == this.data.params.count
    })
    if(this.data.params.offset>0){
        list=[...this.data.goodsList,...list];
    }
    this.setData({
      goodsList:list
    });
    wx.stopPullDownRefresh();
    console.log('商品数据',list)
  },
  goGoodsDtl(e){
    console.log(e);
    const spuId =e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDtl/goodsDtl?spuId='+spuId,
    });
  },
  bandleListtap(){

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
    this.data.params.offset =0;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.canReachBottomRefresh){
      this.data.params.offset +=this.data.params.count;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})