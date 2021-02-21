import React, {useState, useEffect } from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router'
import '../public/style/pages/buyCar.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Screen from '../components/Screen2'
import CarList from '../components/CarList'
import Foot from '../components/Foot'
import { Breadcrumb, Pagination ,Input} from 'antd';
import { getListCars, getCarBrandList, getOpeningCityList } from '../public/api/index'
import { AgeObj, filterParams, mileageObj, getUrlParams } from '../public/js/vx'
import $vx from '../public/js/vx'

let pageIndex = 1,pageSize=40;

const buyCar = (props) => {
  const { Search } = Input;
  const router = props.router
  const asPath = router.asPath
  const query = router.query
  const sortType = {
    'f_last_update_date DESC': 'f_last_update_date',
    'f_plate_year DESC': 'f_plate_year ASC',
    'f_plate_year ASC': 'f_plate_year DESC',
    'f_kilometres DESC': 'f_kilometres ASC',
    'f_kilometres ASC': 'f_kilometres DESC',
    'f_retail_price DESC': 'f_retail_price ASC',
    'f_retail_price ASC': 'f_retail_price DESC'
  }

  const [keyWord, setKeyWord] = useState('')
  // const [listCars, setListCars] = useState({tlist:[]})
  const [crunb, setCrunb] = useState([])
  const listCars = props.listCars || {tlist:[]};
  const carBrandList = props.carBrandList || []
  getCarBrandObj()
 
  function getCarBrandObj(){
    var hash = {}
    if (carBrandList.length) {
      for (let i = 0; i < carBrandList.length; i++) {
        let carBrands = carBrandList[i].carBrands
        for (let j = 0; j < carBrands.length; j++) {
          hash[carBrands[j].id] = carBrands[j]

        }
      }

    }
    $vx.sessionStorage.setItem('carBrandObj', hash);
  }

  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo(0,1);
    },50)
  },[])
  
  useEffect(()=>{
    updateCrunbData()
    $vx.sessionStorage.setItem('location',props.location)
  },[props.listCars])

  // 更新面包屑数据
  const updateCrunbData = () => {
    let carBrand = $vx.sessionStorage.getItem('carBrandObj');
    const location = props.location || $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'};
    if (query.brandId) {
      setCrunb([
        { href: `/index/${location.cityFullPinYin}`, name: `${location.cityName || ''}二手车` },
        { href: `/buyCar/${location.cityFullPinYin}`, name: `${location.cityName || ''}二手车出售` },
        { name: `${location.cityName || ''}二手${carBrand[query.brandId].brandName}` },
      ])
    } else {
      setCrunb( [
        { href: `/index/${location.cityFullPinYin}`, name: `${location.cityName || ''}二手车` },
        { name: `${location.cityName || ''}二手车出售` },
      ] )
    }
  }

  // 排序
  function buySort(typeName) {
    let sort = query.sortStr
    let type = typeName
    let pathname = `/buyCar/${props.location.cityFullPinYin}`
    if (sort) {
      if (type == 'f_last_update_date') {
        return Router.replace({ pathname, query: { ...query, sortStr: `${type} DESC` } })
      }
      if(sort.indexOf(type) > -1){
        Router.replace({ pathname, query: { ...query, sortStr: sortType[sort] } })
      } else{
        Router.replace({ pathname, query: { ...query, sortStr: `${type} ASC`, } })
      }
    }else{
      if (type=='f_last_update_date'){
        Router.replace({ pathname, query: { ...query,sortStr: `${type} DESC` } })
      } else{
        Router.replace({ pathname, query: { ...query,sortStr: `${type} ASC` } })
      }
    }
    
  }

  function jianActive(type) {
    if (query.sortStr && query.sortStr.indexOf(type) > -1){
      if (query.sortStr.indexOf('DESC') > -1) return 'desc'
      if (query.sortStr.indexOf('ASC') > -1) return 'asc'
    }
  }

  // 改变类别
  function changTab(_type) {
    Router.push({ pathname: `/buyCar/${props.location.cityFullPinYin}`, query: { ...query, queryCarType: _type, } })
  }

  // 条件选择
  function setSelectItem(key, value) {
    let query = router.query
    query[key] = value
    Router.push({ pathname: `/buyCar/${props.location.cityFullPinYin}`, query: { ...query, pageIndex: 1 } })
  }

  return (
    <div>
      <MetaHead type="wybuy" location={props.location}></MetaHead>
      {/* 头部导航 */}
      <div id="buyHead"><Header nowCity={props.location} cityList={props.openingCityList}  showCitySelect = {true}></Header></div>

      { /* 侧边工具栏 */ }
      <SiderNav></SiderNav>
      <div className="w1200" >
        <div className="crumb">
          <Breadcrumb separator=">">
            {
              crunb.map((ele, index) => (
                <Breadcrumb.Item key={index}  {...ele}>{ele.name}</Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <Search placeholder="请输入关键词，例如：保时捷Macan 2.0T" maxLength={20} value={keyWord} onChange={(e)=>{setKeyWord(e.target.value)}} onSearch={value =>{
            
            setSelectItem('keyWord', value.trim())
          }} style={{ width: 306 }}/>
        </div>
        <Screen router={router} totalCar={listCars.total || 0} carBrandList={carBrandList}></Screen>
      </div>
      <div className = "sort w1200" >
        <div className="sortL">
          <div className = {`sortItem ${!query.queryCarType||query.queryCarType==1?'active':''}`} onClick={()=>{changTab(1)}}> 全部 </div>
          <div className="line"></div>
          <div className = {`sortItem ${query.queryCarType&&query.queryCarType==2?'active':''}`} onClick={()=>{changTab(2)}}> 新上架 </div>
          {/* <div className="line"></div>
          <div className="sortItem">准新车</div> */}
        </div>
        <div className="sortR">
          <div className={`sortItem ${query.sortStr&&query.sortStr.indexOf('f_kilometres')>-1?'active':''}`} onClick={()=>{buySort('f_kilometres')}}>
            <span>里程</span>
            <div className={`jiantou ${jianActive('f_kilometres')}`}></div>
          </div>
          <div className={`sortItem ${query.sortStr&&query.sortStr.indexOf('f_plate_year')>-1?'active':''}`} onClick={()=>{buySort('f_plate_year')}}>
            <span>车龄</span>
            <div className={`jiantou ${jianActive('f_plate_year')}`}> </div>
          </div>
          <div className={`sortItem ${query.sortStr&&query.sortStr.indexOf('f_retail_price')>-1?'active':''}`} onClick={()=>{buySort('f_retail_price')}}>
            <span>价格</span>
            <div className={`jiantou ${jianActive('f_retail_price')}`} > </div>
          </div>
          <div className={`sortItem ${(!query.sortStr||query.sortStr=='f_last_update_date DESC')?'active':''}`} onClick={()=>{buySort('f_last_update_date')}}>
            <span>默认排序</span>
          </div>
        </div>
      </div>
      <CarList currHotList={listCars.tlist}></CarList>
      <div className="w1200" style={ {textAlign: 'center', marginTop: '20px',marginBottom:'30px'}}>
        <Pagination defaultCurrent = { pageIndex } hideOnSinglePage={true} defaultPageSize = { pageSize } current = { parseInt(query.pageIndex) || pageIndex } total = { listCars.total }
          onChange={(page, pageSize)=>{
            window.scrollTo(0,86) 
            Router.push({ pathname: '/buyCar', query: {...query,pageIndex:page} 
          })
        }}></Pagination>
      </div>
      <Foot cityList = {props.openingCityList}></Foot>
    </div>
  )
}


buyCar.getInitialProps = async (props) => {
  const carBrandList = await getCarBrandList({});
  // 获取车源数据
  let { tabArr, retailPrice, driverYears, kilometres, carLevels, upDateDays, cityName, userIp, ...other } = props.query;
  let pageIdx = props.query.pageIndex || pageIndex;

  let retailPriceMax = ''
  let retailPriceMin = ''
  if (retailPrice) {
    let priceArr = retailPrice.split('-')
    retailPriceMin = priceArr[0]
    retailPriceMax = priceArr[1]
  }
  let upDateDaysMax = '';
  let upDateDaysMin = '';
  if (upDateDays) {
    upDateDaysMax = JSON.parse(upDateDays).max
    upDateDaysMin = JSON.parse(upDateDays).min
  }
  let carLevel = carLevels ? carLevels.split('-') : [];
  let driverYearsMin='', driverYearsMax='';
  if (driverYears) {
    let YearsArr = driverYears.split('-')
    driverYearsMin = YearsArr[0]
    driverYearsMax = YearsArr[1]
  }

  let kilometresMin='', kilometresMax='';
  if (kilometres) {
    let kilometresArr = kilometres.split('-')
    kilometresMin = kilometresArr[0]
    kilometresMax = kilometresArr[1]
  }
  
  const listCars = await getListCars(filterParams({ pageIndex: pageIdx, pageSize: pageSize,sortStr:'f_last_update_date DESC', cityName: cityName, userIp,
    carLevels: carLevel, upDateDaysMax, upDateDaysMin, kilometresMax, kilometresMin, driverYearsMax, driverYearsMin, carType: 2,
    retailPriceMax, retailPriceMin, ...other }));

  const openingCityList = await getOpeningCityList({});

  return { carBrandList: carBrandList.data, listCars: listCars.data.pageDataVO, location: listCars.data.cityVO || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'}, openingCityList: openingCityList.data }
  
}


export default withRouter(buyCar);