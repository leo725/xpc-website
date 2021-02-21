import axios from 'axios'
import { getSign } from './sign'
import { notification } from 'antd';
import { ERPUrl } from '../api/config'
import Cookies from 'js-cookie'

// axios 配置
axios.defaults.timeout = 20000

// POST传参序列化
// axios
//   .interceptors
//   .request
//   .use((config) => {
//     // config.withCredentials=true
//     return config
//   }, (error) => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   })

// // 返回状态判断

// axios
//   .interceptors
//   .response
//   .use((res) => {
//     const response = res.data
//     // console.log(res)
//     // 30006: token 过期了,30007: token token错误;
//     // console.log(typeof response.code)
//     if (response.code === 'undefined') {
//       return response
//     } else {
//       if (response.code === 30006 || response.code === 30007 || response.code === 30008) {
//         return Promise.reject('error')
//       } else if (response.code !== 0) {
//         notification['error']({ description: response.message, });
//         return response
//       } else {
//         return response
//       }
//     }
//   }, (err) => {
//     console.log(err)
//     // 断网 或者 请求超时 状态
//     if (!err.response) {
//       // 请求超时状态
//       if (err.message.includes('timeout')) {
//         console.log('超时了')
//         notification['error']({ description: '请求超时，请检查网络是否连接正常' });
//       } else {
//         // 可以展示断网组件
//         console.log('断网了')
//         notification['error']({ description: '请求失败，请检查网络是否已连接' });
//       }
//       return
//     } else{
//       notification['error']({ description: '请求异常,联系管理员,或刷新重试!!' });
//     }
//     return Promise.reject(err.response)
//   })

export default {
  // get请求
  get(url, param) {
    if(param.sign) delete param.sign
    param.sign = getSign(param)
    return new Promise((resolve, reject) => {
      axios({ 
        method: 'get', url, params: param
     }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // post请求
  post(url, param) {
    if(param.sign) delete param.sign
    // if(url.includes('website/listCars') && user_ip && !param.cityId){
    //   param.cityId = website_cityCode
    // }
    param.sign = getSign(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        headers: { withCredentials: true }
      }).then((res) => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // post请求
  ERPpost(url, param) {
    // 关于小胖车 - 公司动态 ERP系统，接入token
    return new Promise((resolve,reject)=>{
      axios({
        method: 'post',
        url,
        data: param,
        headers: { AuthorToken: 'MIGfMA0GCSqGS123DQEB0i2AA4GNADCBiQKBgQDFL6wprMLNU' }
      }).then((res)=>{
        resolve(res.data)
      }).catch(error=>{
        reject(error)
      })
    })
  },
  // epr get 请求
  ERPget(url, param) {
    // 关于小胖车 - 公司动态 ERP系统，接入token
    return new Promise((resolve,reject)=>{
      axios({
        method: 'get',
        url,
        params: param,
        headers: { AuthorToken: 'MIGfMA0GCSqGS123DQEB0i2AA4GNADCBiQKBgQDFL6wprMLNU' }
      }).then((res)=>{
        resolve(res.data)
      }).catch(error=>{
        reject(error)
      })
    })
  },
}