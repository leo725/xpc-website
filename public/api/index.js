import fetch from '../js/http'
import {
  baseUrl
} from './config'
/***  基础数据  ***/
// 获取省份列表
export const getProvinceList = (query) => {
  return fetch.post(baseUrl + 'systembase/getProvinceList', query)
}
// 获取城市列表
export const getCityList = (query) => {
  return fetch.post(baseUrl + 'systembase/getCityList', query)
}
// 获取区县列表
export const getDistrictList = (query) => {
  return fetch.post(baseUrl + 'systembase/getDistrictList', query)
}

// 品牌
export const getCarBrandList = (query) => {
  return fetch.post(baseUrl + 'systembase/getCarBrandList', query)
}
// 车源列表
export const getListCars = (query) => {
  return fetch.post(baseUrl + 'car/website/listCars', query)
}
// 车源详情
export const getListCarDetail = (query) => {
  return fetch.post(baseUrl + 'car/website/detail', query)
}
// 车系列表
export const getCarSeriesList = (query) => {
  return fetch.post(baseUrl + 'systembase/getCarSeriesList', query)
}
// 车型列表
export const getCarModelList = (query) => {
  return fetch.post(baseUrl + 'systembase/getCarModelList', query)
}

// 小胖看点 - 分页查询
export const getArticlePage = (query) => {
  return fetch.post(baseUrl + 'article/page', query)
}
// 小胖看点 - 详情
export const getArticleDetail = (query) => {
  return fetch.post(baseUrl + 'article/detail', query)
}
// 公司动态 - 分页查询
export const getCompanyNews = (query) => {
  return fetch.post(baseUrl + 'news/getCompanyNews', query);
}
// 公司动态 - 分页查询
export const getNewsDetail = (query) => {
  return fetch.post(baseUrl + 'news/getNewsDetail', query);
}

// 分类取得城市列表
export const getAllCity = (query) => {
  return fetch.post(baseUrl + 'systembase/getAllCity', query);
}
// 获得开通城市列表
export const getOpeningCityList = (query) => {
  return fetch.post(baseUrl + 'systembase/getOpeningCityList', query);
}
// 我要卖车 提交数据
export const saveCrmCustomer = (query) => {
  return fetch.post(baseUrl + 'crm/saveCrmCustomer', query);
}
// 我要卖车 - 车辆评估
export const evalCar = (query) => {
  return fetch.post(baseUrl + 'eval/evalCar', query);
}
// 我要卖车 - 首页获取类别车
export const getLevelCarList = (query) => {
  return fetch.post(baseUrl + 'car/website/getLevelCarList', query);
}
// 我要卖车 - 添加我要卖车
export const saveCarSell = (query) => {
  return fetch.post(baseUrl + 'wantSell/saveCarSell', query);
}
// 我要卖车 - 所有线下店
export const listNormal = (query) => {
  return fetch.post(baseUrl + 'midshop/listNormal', query);
}
// 我要卖车 - 小胖车数据中心
export const dealcount = (query) => {
  return fetch.post('https://manage.xiaopangche.cn/api/count/dealcount', query);
}

