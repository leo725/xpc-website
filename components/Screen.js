import React,{useState,useEffect} from 'react'
import '../public/style/components/screen.scss'
import { InputNumber, Select, Icon } from 'antd';
import Link from 'next/link'
import { priceArr, productArr, vehicleArr, AgeArr, mileageArr,standardArr,carLevelsArr } from '../public/js/vx'
import $vx from '../public/js/vx'
import CountTo from 'react-count-to';
import { getCarSeriesList } from '../public/api/index'

import Router from 'next/router';
const { Option } = Select;

const Screen = function (props) {
  const {  router, totalCar } = props
  const carBrandList = props.carBrandList || []
  const [isBrandDown,setBrandDown] = useState(false)
  const [isMoreDown, setMoreDown] = useState(false)
  const [retailPriceMax, setPriceMax] = useState('')
  const [retailPriceMin, setPriceMin] = useState('')
  const [carVehicleArr, setCarVehicle] = useState(vehicleArr)
  const tabArr = router.query.tabArr ? JSON.parse(router.query.tabArr) :  []
  const retailPrice = router.query.retailPrice ? JSON.parse(router.query.retailPrice) : {}
  console.log(carBrandList);
  // 条件选择
  function setSelectItem(key,value,label,name,type){
    let curItem = { key, value, label, name }
    let query = router.query
    let tabArr = query.tabArr ? JSON.parse(query.tabArr) : []
    let isdeng = false
    let ishas = false
    query[key] = $vx.isObject(value) ? JSON.stringify(value):value
    if (!tabArr.length){
      query.tabArr = JSON.stringify([curItem])
    } else{
      // console.log(tabArr);
      for (let i = 0; i < tabArr.length; i++) {
        const ele = tabArr[i];
        if(ele.key==curItem.key){
          ishas = false
          if (JSON.stringify(ele) == JSON.stringify(curItem)){
            isdeng = true
          } else{
            isdeng = false
            tabArr[i] = curItem
          }
          break;
        } else{
          ishas = true
        }
      }

      ishas?tabArr.push(curItem):''

      
      if(type=='product' ){
        // (async () => {
        //   let cx = await getCarSeriesList({ brandId: value })
        //   console.log(cx);
        // })()
        if (query.catenaId){
          delete query['catenaId']
          for (let i = 0; i < tabArr.length; i++) {
            const ele = tabArr[i];
            if (ele.key == 'catenaId') {
              tabArr.splice(i, 1)
              break;
            }
          }
        }
      }

      // console.log(tabArr);
      query.tabArr = JSON.stringify(tabArr)
    }
    setBrandDown(false)
    isdeng?'':Router.push({ pathname: '/buyCar', query: {...query,pageIndex:1} })
  }

  // 不限条件选择
  function setSelectItem2(key,type) {
    let query = router.query
    let tabArr = query.tabArr ? JSON.parse(query.tabArr) : []
    delete query[key]
    for (let i = 0; i < tabArr.length; i++) {
      const ele = tabArr[i];
      if (ele.key == key) {
        tabArr.splice(i, 1)
        break;
      }
    }
    if(type=='product' && query.catenaId){
        delete query['catenaId']
        for (let i = 0; i < tabArr.length; i++) {
          const ele = tabArr[i];
          if (ele.key == 'catenaId') {
            tabArr.splice(i, 1)
            break;
          }
        }
      }
    query.tabArr = JSON.stringify(tabArr)
    setBrandDown(false)
    Router.push({ pathname: '/buyCar', query: {...query,pageIndex:1} })
  }
  // 删除筛选项
  function delTab(item,index){
    let query = router.query
    let tabArr = query.tabArr ? JSON.parse(query.tabArr) : []
    tabArr.splice(index, 1)
    query.tabArr = JSON.stringify(tabArr)
    delete query[item.key]
    setBrandDown(false)
    Router.push({ pathname: '/buyCar', query: {...query,pageIndex:1} })
  }

  // 价格搜素
  function priceSearch(max, min) {
    let maxPrice = max ,minPrice = min;
    let label = ''
    let price = ''
    if (minPrice == '' && maxPrice == '') return false;
    label = minPrice + '-' + maxPrice + '万元'
    if (minPrice == '') {
      label = 0 + '-' + maxPrice + '万元'
    }
    if (maxPrice == '') {
      label = minPrice + '-' + 999 + '万元'
    }
    if (minPrice != '' && maxPrice != '') {
      if (maxPrice < minPrice) {
        price = minPrice
        minPrice = maxPrice
        maxPrice = price
        setPriceMax(maxPrice)
        setPriceMin(minPrice)
      }
    }
    
    setSelectItem('retailPrice', { max: maxPrice, min: minPrice }, '价格', label)
  }

  useEffect(() => {

    // return ()=>{
    //   console.log(query);
    // }
  }, [])

  return (
    <div>
      <div className="screen">
        <div className="screenItem">
          <div className="screen-l">
            <div className="brand-top">
              <div className="screenTit">品牌</div>
              <div className="brand">
                <div onClick={()=>{setSelectItem2('brandId','product')}}  className={`brandItem ${!router.query.brandId?'active':''}`}>不限</div>
                {
                  productArr.map((ele,index)=>(
                    <div key={index} onClick={()=>{setSelectItem('brandId',ele.value,'品牌',ele.label,'product')}} className={`brandItem ${router.query.brandId == ele.value?'active':''}`}>{ele.label}</div>
                  ))
                }
              </div>
              <div className="brandmore" onClick={()=>{setBrandDown(!isBrandDown)}}>
                {isBrandDown?'收起':'全部'}
                <Icon rotate={isBrandDown?-180:0} type="down" />
              </div>
            </div>
            <div className="baran-all" style={{display:isBrandDown?'block':'none'}}>
              <div className="baranBox">
                {
                  carBrandList.map((ele, index) => (
                    <div className="baranItem" key={index}>
                      <div className="zi">{ele.initials}</div>
                      <div className="barantxt">
                        {
                          ele.carBrands.map((item, i) => (
                            <div className="cartxt" key={i} onClick={()=>{setSelectItem('brandId',item.id,'品牌',item.brandName)}}>
                              {item.brandName}
                            </div>  
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        {/* <div className="screenItem">
          <div className="screen-l">
            <div className="brand-top">
              <div className="screenTit">车系</div>
              <div className="brand">
                <div onClick={()=>{setSelectItem2('catenaId')}}  className={`brandItem ${!router.query.catenaId?'active':''}`}>不限</div>
                {
                  carVehicleArr.map((ele, index) => (
                    <div key={index} onClick={()=>{setSelectItem('catenaId',ele.value,'车系',ele.label)}} className={`brandItem ${router.query.catenaId == ele.value?'active':''}`}>{ele.label}</div>
                  ))
                }
              </div>
              <div className="brandmore">全部<Icon type="down" /></div>
            </div>
            <div className="baran-all">
              <p> 11111111</p>
              <p> 11111111</p>
              <p> 11111111</p>
              <p> 11111111</p>
              <p> 11111111</p>
              <p> 11111111</p>
            </div>
          </div>
        </div> */}
        <div className="screenItem">
          <div className="screen-l">
            <div className="brand-top">
              <div className="screenTit">价格</div>
              <div className="brand">
                <div onClick={()=>{setSelectItem2('retailPrice')}} className={`brandItem ${!router.query.retailPrice ?'active':''}`} >不限</div>
                {
                  priceArr.map((ele,index)=>(
                    <div onClick = {() => { setSelectItem('retailPrice', ele.value, '价格', ele.label) } } className = { `brandItem ${retailPrice.min==ele.value.min&&retailPrice.max==ele.value.max ?'active':''}` } key = { index } >
                      {ele.label}
                    </div>
                  ))
                }
                <div className="">
                  <InputNumber size="small" onChange={(e)=>{setPriceMin(e)}} defaultValue={retailPrice.min} value={retailPriceMin} style={{width:'70px'}} min={0} max={999} step={1}  precision={0}/>
                  <span> - </span>
                  <InputNumber size="small" onChange={(e)=>{setPriceMax(e)}} defaultValue={retailPrice.max} value={retailPriceMax} style={{width:'70px'}} min={0} max={999} step={1} precision={0} />
                  <span> 万 </span>
                  <div className="pricebtn" onClick={()=>{priceSearch(retailPriceMax || 999,retailPriceMin || 0)}}>
                    确定
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="screenItem">
          <div className="screen-l">
            <div className="brand-top">
              <div className="screenTit">更多</div>
              <div className="brand moreselect">
                <div className="brandItem ">
                  <Select defaultValue={router.query.driverYears}  placeholder='车龄' onChange={(value)=>{value=='不限'?setSelectItem2('driverYears'):setSelectItem('driverYears', value, '车龄', value) }} style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      AgeArr.map((ele, index) => (
                        <Option key={index} value={ele.label}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem ">
                  <Select defaultValue={router.query.kilometres} placeholder='里程' onChange={(value)=>{value=='不限'?setSelectItem2('kilometres'):setSelectItem('kilometres', value, '里程', value) }} style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      mileageArr.map((ele, index) => (
                        <Option key={index} value={ele.label}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem ">
                  <Select defaultValue={router.query.standard} placeholder="排放标准" onChange={(value)=>{value=='不限'?setSelectItem2('standard'):setSelectItem('standard', value, '排放标准', value) }}  style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      standardArr.map((ele, index) => (
                        <Option key={index} value={ele.label}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* <div className="brandItem ">
                  <Select defaultValue={router.query.carLevels} placeholder="级别" onChange={(value)=>{setSelectItem('carLevels', value, '级别', value) }}  style={{ width: 120 }} >
                    {
                      carLevelsArr.map((ele, index) => (
                        <Option key={index} value={ele.label}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div> */}
                
              </div>
              {/* <div className="brandmore" onClick={()=>{setMoreDown(!isMoreDown)}}>
                {isMoreDown?'收起':'全部'}
                <Icon rotate={isMoreDown?-180:0} type="down" />
              </div> */}
            </div>
  
          </div>
        </div>
      </div>
      <div className='filterClear'>
        <div style={{display:tabArr.length?'block':'none'}}>
          <div className="filter">
            <span className="tit">当前筛选：</span>
            {
              tabArr.map((ele,index)=>(
                <div className="filterItem" key={index+ele.name} onClick={()=>{delTab(ele,index)}}>
                  <span>{ele.label?ele.label+'：':''}</span>
                  {ele.name}
                  <Icon type="close" style={{marginLeft:'6px',fontSize:'12px'}}/>
                </div>
              ))
            }
            <Link  href={{pathname:'/buyCar'}}>
              <a><div className="reset">重置条件</div></a>
            </Link>
          </div>
        </div>
        <div className="num">
          为您找到
          <span style={{color:"#333"}}> <CountTo to={totalCar} speed={1000} /> </span>
          辆好车
        </div>
      </div>
    </div>
  )
}


export default Screen;