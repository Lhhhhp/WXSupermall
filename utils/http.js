const domain = 'http://118.24.74.205:7001/weapp/';
const request = (method = 'GET') => (url, data = {},loading = true) => {
  if (loading){
    wx.showNavigationBarLoading();
  }
  data = Object.assign({},data,{mid:83});
  return new Promise((resolve, reject) => {
    wx.request({
      url: domain + url,
      data,
      method,
      dataType: 'json',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data.data)
        } else{
          reject(res.data.message)
        }
      },
      fail: function (error) {
        reject(error)
      },
      complete: function (error) {
        if(loading){
          wx.hideNavigationBarLoading();
          reject(error);
        }
      }
    });
  })
}

export default {
  get:request('GET'),
  post:request('POST')
};


