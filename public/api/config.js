var baseUrl = ''
var imgUrl = ''
var ERPUrl = ''
var shareUrl = ''
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  imgUrl = 'https://resource.xiaopangche.cn/'
  // baseUrl = 'http://192.168.0.22:1088/api/'
  // baseUrl = 'https://portalapi.xiaopangche.cn/api/'
  // shareUrl = 'https://share.xiaopangche.cn/html/usershare/#/'
  
  baseUrl = 'http://remote.xiaopangche.cn:20038/api/'
  shareUrl = 'https://testshare.xiaopangche.cn:30001/html/usershare/#/'

  baseUrl = 'https://portal.xiaopangche.cn/api/'
  shareUrl = 'https://share.xiaopangche.cn/html/usershare/#/'


} else {
  imgUrl = 'https://resource.xiaopangche.cn/'

  baseUrl = 'https://portal.xiaopangche.cn/api/'
  shareUrl = 'https://share.xiaopangche.cn/html/usershare/#/'

  // baseUrl = 'http://remote.xiaopangche.cn:20038/api/'
  // shareUrl = 'https://testshare.xiaopangche.cn:30001/html/usershare/#/'
}

export  {
  baseUrl,
  imgUrl,
  shareUrl
}