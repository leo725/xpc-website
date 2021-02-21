import { imgUrl, baseUrl } from '../api/config'

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = "yyyy-MM-dd";

var vx = { version: "1.0" };


export const priceArr = [
  { label: '3万以下', value: { max: 3, min: '' } },
  { label: '3-7万', value: { max: 7, min: 3 } },
  { label: '7-10万', value: { max: 10, min: 7 } },
  { label: '10-20万', value: { max: 20, min: 10 } },
  { label: '20-30万', value: { max: 30, min: 20 } },
  { label: '30-50万', value: { max: 50, min: 30 } },
  { label: '50万以上', value: { max: '', min: 50 } },

]
export const priceArr2 = [
  { label: '3万以下', value: '0-3' },
  { label: '3-7万', value: '3-7' },
  { label: '7-10万', value: '7-10' },
  { label: '10-20万', value: '10-20' },
  { label: '20-30万', value: '20-30' },
  { label: '30-50万', value: '30-50' },
  { label: '50万以上', value: '50-999' },

]
export const AgeArr = [
  { label: '1年以内'},
  { label: '2年以内' },
  { label: '3年以内'},
  { label: '5年以内'},
  { label: '8年以内'},
  { label: '8年以上'},
]
export const AgeArr2 = [
  { label: '2年以下', value: '0-2' },
  { label: '2-4年', value: '2-4' },
  { label: '4-6年', value: '4-6' },
  { label: '6-10年', value: '6-10' },
  { label: '10年以上', value: '10-99' },
]
export const AgeObj = {
  '1年以内': { driverYearsMax: 1, driverYearsMin: '' },
  '2年以内': { driverYearsMax: 2, driverYearsMin: '' },
  '3年以内': { driverYearsMax: 3, driverYearsMin: '' },
  '5年以内': { driverYearsMax: 5, driverYearsMin: '' },
  '8年以内': { driverYearsMax: 8, driverYearsMin: '' },
  '8年以上': { driverYearsMax: '', driverYearsMin: 8 },
}
export const AgeObj2 = {
  '0-2': '2年以下',
  '2-4': '2-4年',
  '4-6': '4-6年',
  '6-10': '6-10年',
  '10-99': '10年以上',
}
export const mileageArr = [
  { label: '1万公里内' },
  { label: '3万公里内' },
  { label: '4万公里内' },
  { label: '5万公里内'},
  { label: '8万公里内' },
  { label: '10万公里内' },
  { label: '10万公里以上' },
]
export const mileageArr2 = [
  { label: '1万公里内', value: '0-1' },
  { label: '3万公里内', value: '0-3' },
  { label: '4万公里内', value: '0-4' },
  { label: '5万公里内', value: '0-5' },
  { label: '8万公里内', value: '0-8' },
  { label: '10万公里内', value: '0-10' },
  { label: '10万公里以上', value: '10-60' },
]
export const mileageObj = { 
  '1万公里内': { kilometresMax: 1, kilometresMin: 0 },
  '3万公里内': { kilometresMax: 3, kilometresMin: 0 },
  '4万公里内': { kilometresMax: 4, kilometresMin: 0 },
  '5万公里内': { kilometresMax: 5, kilometresMin: 0 },
  '8万公里内': { kilometresMax: 8, kilometresMin: 0 },
  '10万公里内': { kilometresMax: 10, kilometresMin: 0 },
  '10万公里以上': { kilometresMax: '', kilometresMin: 10 }
}
export const mileageObj2 = {
  '0-1': '1万公里内',
  '0-3': '3万公里内',
  '0-4': '4万公里内',
  '0-5': '5万公里内',
  '0-8': '8万公里内',
  '0-10': '10万公里内',
  '10-60': '10万公里以上',
}


export const productArr = [
  { label: '奔驰', value: 189, url: imgUrl + 'resource/car_brand_icon/189.jpg' },
  { label: '大众', value: 215, url: imgUrl + 'resource/car_brand_icon/215.jpg' },
  { label: '宝马', value: 190, url: imgUrl + 'resource/car_brand_icon/190.jpg' },
  { label: '奥迪', value: 176, url: imgUrl + 'resource/car_brand_icon/176.jpg' },
  { label: '丰田', value: 219, url: imgUrl + 'resource/car_brand_icon/219.jpg' },
  { label: '别克', value: 182, url: imgUrl + 'resource/car_brand_icon/182.jpg' },
  { label: '福特', value: 221, url: imgUrl + 'resource/car_brand_icon/221.jpg' },
  { label: '现代', value: 327, url: imgUrl + 'resource/car_brand_icon/327.jpg' },
  { label: '本田', value: 196, url: imgUrl + 'resource/car_brand_icon/196.jpg' },
  { label: '日产', value: 301, url: imgUrl + 'resource/car_brand_icon/301.jpg' },
  { label: '马自达', value: 292, url: imgUrl + 'resource/car_brand_icon/292.jpg' },
  { label: '保时捷', value: 181, url: imgUrl + 'resource/car_brand_icon/181.jpg' },
  { label: '路虎', value: 280, url: imgUrl + 'resource/car_brand_icon/280.jpg' },
  { label: '雷克萨斯', value: 283, url: imgUrl + 'resource/car_brand_icon/283.jpg' },
  { label: '雪佛兰', value: 329, url: imgUrl + 'resource/car_brand_icon/329.jpg' },
]
export const vehicleArr = [
  { label: '奔驰C级', value: 1314 },
  { label: '宝马5系', value: 1369 },
  { label: '福克斯', value: 1801 },
  { label: '奥迪A6L', value: 1193 },
  { label: '宝马3系', value: 1368 },
  { label: '奥迪A4L', value: 1191 },
  { label: '奔驰E级', value: 1315 },
  { label: '途观', value: 1709 },
  { label: '凯美瑞', value: 1761 },
  { label: '奔驰GLC级', value: 1317 },
  { label: '保时捷Macan', value: 1246 },
  { label: '马自达6', value: 2429 },
  { label: '凯越', value: 1255 },
]
export const standardArr = [
  { label: '国Ⅱ及以上' },
  { label: '国Ⅲ及以上' },
  { label: '国Ⅳ及以上' },
  { label: '国Ⅴ及以上' },
  { label: '国Ⅵ'},
]
export const standardArr2 = [
  { label: '国Ⅱ及以上', value: '国Ⅱ及以上' },
  { label: '国Ⅲ及以上', value: '国Ⅲ及以上' },
  { label: '国Ⅳ及以上', value: '国Ⅳ及以上' },
  { label: '国Ⅴ及以上', value: '国Ⅴ及以上' },
  { label: '国Ⅵ', value: '国Ⅵ' },
]
export const carLevelsArr = [
  { label: '轿车' },
  { label: 'SUV' },
  { label: 'MPV' },
  { label: '跑车' },
  { label: '面包车'},
  { label: '商务'}
]
export const gearboxTypeArr = [
  { label: '手动', value: 'manual' },
  { label: '自动', value: 'auto' },
]
export const gearboxTypeObj = { 'manual': '手动', 'auto': '自动' }

export const hardKeyNameObj = {  }

export function shortImg(url, width, height) {
  if (!url) return;
  url = url.replace('http://', 'https://');
  var idx = url.lastIndexOf('.');
  var type = url.substring(idx, url.length);
  let backUrl = '';
  // let ossShuiYin = '2020/06/17/_282f4492-ad4e-4546-8170-79d339c048c5.png';  // oss 水印图片，转为base64 = MjAyMC8wNi8xNy9fMjgyZjQ0OTItYWQ0ZS00NTQ2LTgxNzAtNzlkMzM5YzA0OGM1LnBuZw==
  let base64ImgCode
  if (baseUrl.includes('remote')) {
    base64ImgCode = 'MjAyMC8wNi8xNy9fMjgyZjQ0OTItYWQ0ZS00NTQ2LTgxNzAtNzlkMzM5YzA0OGM1LnBuZw=='
  } else {
    base64ImgCode = 'MjAyMC8wNi8xNy9fNWYzMmRkYjctNWI1OC00YTQ2LTgwZTUtMTYxOWZmZjNhZDU1LnBuZw=='
  }
  // let base64ImgCode = window.btoa(base64Img)
  if (url.includes('oss-cn-')) {
    // oss 图片
    if (width && height) {
      backUrl = `${url}?x-oss-process=image/resize,m_lfit,w_${width},h_${height},limit_0/watermark,image_${base64ImgCode},t_90,g_se,x_10,y_10`
    } else if (width) {
      backUrl = `${url}?x-oss-process=image/resize,m_mfit,w_${width},limit_0/watermark,image_${base64ImgCode},t_90,g_se,x_10,y_10`
    } else if (height) {
      backUrl = `${url}?x-oss-process=image/resize,m_lfit,h_${height},limit_0/watermark,image_${base64ImgCode},t_90,g_se,x_10,y_10`
    } else {
      backUrl = `${url}?x-oss-process=image/resize,m_lfit,w_200,limit_0/watermark,image_${base64ImgCode},t_90,g_se,x_10,y_10`
    }
  } else {
    // 非 oss 图片
    if (width && height) {
      backUrl = url + '_' + 200 + 'x' + 200 + type;
    } else if (height) {
      backUrl = url + '_-' + height + type;
    } else if (width) {
      backUrl = url + '_' + width + '-' + type
    } else {
      backUrl = url + '_' + 200 + '-' + type
    }
  }
  return backUrl
}

export function stopScroll(id){
  let ele = document.getElementById(id);
  if(ele){
    ele.onmousewheel = function (event) {
      if (!event) event = window.event;
      this.scrollTop = this.scrollTop - (event.wheelDelta ? event.wheelDelta : -event.detail * 10);
      return false;
    }
  }
}
export function getUrlParams (asPath) {
  const vars = decodeURI(asPath.split('?')[1]).split("&")
  const queryParms = {}
  vars.map((ele, index) => {
    let arr = ele.split('=')
    queryParms[arr[0]] = arr[1]
  })
  return queryParms
}

// export function shortImg(url, width, height) {
//   if (!url) return;
//   var idx = url.lastIndexOf('.');
//   var type = url.substring(idx, url.length);
//   if (url.indexOf('oss-cn-') < 0) {
//     if (width && height) {
//       return url + '_' + width + 'x' + height + type;
//     } else if (height) {
//       return url + '_-' + height + type;
//     } else if (width) {
//       return url + '_' + width + '-' + type
//     } else {
//       return url + '_' + width + '-' + type
//     }
//   } else {
//     if (width && height) {
//       return url + '?x-oss-process=image/resize,m_lfit,w_' + width + ',h_' + height
//     } else if (width) {
//       return url + '?x-oss-process=image/resize,m_lfit,w_' + width
//     } else if (height) {
//       return url + '?x-oss-process=image/resize,m_lfit,h_' + height
//     } else {
//       return url + '?x-oss-process=image/resize,m_lfit,w_' + width
//     }
//   }
// }

// 是否有属性
vx.hasProp = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
// 删除属性
vx.deleteProp = function (obj, prop) {
  if (vx.hasProp(obj, prop)) {
    delete obj[prop];
  }
};
// 拷贝属性
vx.copyProps = function (target, source, isCopyAll) {
  isCopyAll = isCopyAll || false;
  if (target && source) {
    for (var p in source) {
      // p is method
      if (typeof source[p] === "function") {
        // do nothing
      } else {
        if (isCopyAll) {
          target[p] = source[p];
        } else {
          if (vx.hasProp(target, p)) {
            target[p] = source[p];
          }
        }
      }
    }
  }
};
// 对比删除属性
vx.compareAndRemoveProps = function (target, source) {
  var newDict = {};
  if (target && source) {
    for (var p in source) {
      // p is method
      if (typeof source[p] === "function") {
        // do nothing
      } else {
        if (vx.hasProp(target, p)) {
          newDict[p] = source[p];
        }
      }
    }
  }
  return newDict;
};
// 获取属性值列表
vx.getPropertyValueList = function (sources, propName) {
  var results = [];
  if (sources) {
    for (var k in sources) {
      var v = sources[k][propName];
      if (v) {
        results.push(v);
      }
    }
  }
  return results;
};
// 判断是否是手机端
vx.isMobile = function () {
  if (!navigator) throw "Not Supported!";
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true;
  } else {
    return false;
  }
};

// 是否是图片文件
vx.isImageFile = function (fileName) {
  var regex = new RegExp("(jpeg|png|gif|jpg)$", "i");
  return regex.test(fileName);
};
// 是否是字符串
vx.isString = function (str) {
  return typeof str === "string" && str.constructor === String;
};
// 是否是数字
vx.isNumber = function (obj) {
  return typeof obj === "number" && obj.constructor === Number;
};
// 是否是时间
vx.isDate = function (obj) {
  return typeof obj === "object" && obj.constructor === Date;
};
// 是否是函数
vx.isFunction = function (obj) {
  return typeof obj === "function" && obj.constructor === Function;
};
// 是否是对象
vx.isObject = function (obj) {
  return typeof obj === "object" && obj.constructor === Object;
};


// 获取时间
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}
// 取整时间
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
// 模板时间
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// class添加
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function filterParams(params){
  let obj = {}
  for(let key in params){
    if (params[key] && params[key] != '' && params[key] != null) {
      obj[key] = params[key]
    }
  }
  return obj
}

export const ViewerOptions = {
  url: 'data-original',
  toolbar: {
    zoomIn: 4,
    zoomOut: 4,
    oneToOne: 4,
    reset: false,
    prev: 4,
    play: false,
    next: 4,
    rotateLeft: 4,
    rotateRight: 4,
    flipHorizontal: false,
    flipVertical: false,
  },
  zIndex: 9999,
  navbar:false
}
// element-ui里的DateTimePicker组件带快捷选项参数
export const pickerOptions = [
{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]

// 弹性
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 深度拷贝
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 验证手机号码
export function regPhone(phone) {
  return (/^1[3456789]\d{9}$/.test(phone))
}
// 验证邮箱
export function regEmail(email) {
  return (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email))
}
// 验证身份证
export function regCard(ID) {
  return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(ID))
}

// localStorage存储
vx.localStorage = {
  setItem: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem: function (key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  removeItem: function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
};

vx.sessionStorage = {
  setItem: function (key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem: function (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  removeItem: function (key) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {}
  }
};

export default vx;