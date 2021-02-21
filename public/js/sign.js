import {md5} from './md5.js'
let secretId = 'xiaopangcheskey123'; //加盐
// 生成签名
export function getSign(param) {
  let params = createSing(param)
  if (typeof params == "string") {
    return paramsStrSort(params);
  } else if (typeof params == "object") {
    var arr = [];
    for (var i in params) {
      if (params[i] && typeof params[i] === "object") {
        arr.push((i + "=" + JSON.stringify(params[i])));
      } else {
        arr.push((i + "=" + params[i]));
      }
    }
    return md5(secretId + arr.sort().join("&") + secretId).toLocaleLowerCase();
  }
}

// 对象排序方法
export function sort_ASCII(obj) {
  var arr = new Array();
  var num = 0;
  for (var i in obj) {
    arr[num] = i;
    num++;
  }
  var sortArr = arr.sort();
  var sortObj = {};
  for (var i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  return sortObj;
}
// 参数递归排序
export function createSing(obja) {
  let obj = obja;
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          if (Array.isArray(obj[key])) {
            obj[key].forEach((ele, index) => {
              if (ele && typeof ele === "object") {
                if (!Array.isArray(ele)) {
                  obj[key][index] = sort_ASCII(ele)
                  createSing(obj[key][index]);
                }
              } else {
                obj[key][index] = ele
                obj[key] = obj[key];
              }
            });
            JSON.stringify(obj[key]);
          } else {
            obj[key] = sort_ASCII(obj[key])
            obj[key] = createSing(obj[key]);
          }

        } else {
          //如果不是，简单复制
          // objClone[key] = obj[key];
        }
      }
    }
  }
  return obj;
}