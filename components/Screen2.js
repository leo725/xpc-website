import React,{useState,useEffect} from 'react'
import '../public/style/components/screen.scss'
import { InputNumber, Select, Icon } from 'antd';
import Link from 'next/link'
import { priceArr2, productArr, vehicleArr, AgeArr2, AgeObj2, mileageArr2, mileageObj2, standardArr2, carLevelsArr, gearboxTypeArr, hardKeyNameObj, gearboxTypeObj } from '../public/js/vx'
import $vx, { filterParams, getUrlParams } from '../public/js/vx'
import CountTo from 'react-count-to';
import { getCarSeriesList } from '../public/api/index'
import Router from 'next/router';
import { route } from 'next/dist/next-server/server/router';
const { Option } = Select;

const Screen = function (props) {
  const { carBrandList, router, totalCar } = props
  const query =router.query
  const [isBrandDown,setBrandDown] = useState(false)
  const [isMoreDown, setMoreDown] = useState(false)
  const [retailPriceMax, setPriceMax] = useState('')
  const [retailPriceMin, setPriceMin] = useState('')
  const [carVehicleArr, setCarVehicle] = useState(vehicleArr)
  const [carLevelDF, setCarLevelDF] = useState([])
  const [tabArr, setTabArr] = useState([])

  // 获取
  function getHardlDF(key) {
    const queryParms = getUrlParams(router.asPath)
    if (queryParms[key]) {
      if (queryParms[key].indexOf('-') > -1) {
        let arr = queryParms[key].split('-')
        return arr || []
      } else {
        return [queryParms[key]] || []
      }
    }
  }
  

  // 条件选择
  function setSelectItem(key,value,type){
    let query = router.query
    if(type=='hard'){
      query[key] = value.join('-')
    }else{
      query[key] = value 
    }
    setBrandDown(false)
    const location = $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'};
    let queryParams = {...query,pageIndex:1}
    let queryArr = [];
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        if(key !='cityName') {
          queryArr.push(`${key}=${queryParams[key]}`)
        }
      }
    }
    Router.push({ pathname: '/buyCar', query: queryParams },`/buyCar/${location.cityFullPinYin}?${queryArr.join('&')}`)
  }


  // 删除筛选项
  function delTab(item){
    let query = router.query
    if(item.type=='hard'){
      if (query[item.key].indexOf('-')>-1){
        let arr = query[item.key].split('-')
        let index = arr.indexOf(item.value)
        arr.splice(index,1)
        if(arr.length>1){
          let str = arr.join('-')
          query[item.key] = str
        } else{
          query[item.key] = arr[0]
        }
      }else{
        delete query[item.key]
      }
      
    }else{
      delete query[item.key]
    }
    setBrandDown(false)
    Router.push({ pathname: '/buyCar', query: {...query,pageIndex:1} })
  }

  // 价格搜素
  function priceSearch(max, min) {
    let maxPrice = max ,minPrice = min;
    let price = ''
    if (minPrice != '' && maxPrice != '') {
      if (maxPrice < minPrice) {
        price = minPrice
        minPrice = maxPrice
        maxPrice = price
        setPriceMax(maxPrice)
        setPriceMin(minPrice)
      }
    }
    setSelectItem('retailPrice', minPrice +'-'+ maxPrice)
  }

  useEffect(() => {
    const queryParms = router.query
    if (queryParms.retailPrice) {
      let priceArr = queryParms.retailPrice.split('-')
      setPriceMin(parseInt(priceArr[0]))
      setPriceMax(parseInt(priceArr[1]))
    } else{
      setPriceMin('')
      setPriceMax('')
    }

    const DWobj = {
      keyWord: { label: '关键词', name: '' },
      brandId: { label: '品牌', name: '' },
      retailPrice: { label: '价格', name: '万' },
      driverYears: { label: '车龄', name: '' },
      kilometres: { label: '里程', name: '' },
      standard: { label: '排放标准', name: '' },
      carLevels: { label: '级别', name: '' },
      gearboxType: { label: '变速箱', name: '' },
    }
    let carBrand = $vx.sessionStorage.getItem('carBrandObj');
    let tabArr = []
    let { brandId, retailPrice, driverYears, kilometres, standard, carLevels, keyWord, gearboxType } = queryParms
    let tabObj = { brandId, retailPrice, driverYears, kilometres, standard, carLevels, keyWord, gearboxType }
    tabObj = filterParams(tabObj)
    // console.log(tabObj);
    for (const key in tabObj) {
      let ele = tabObj[key];
      if (ele) {
        if (key == 'carLevels' ) {
          let carLevelArr = ele.split('-') 
          if(key=='carLevels'){
            carLevelArr.map(ele=>{
              return tabArr.push({ label: DWobj[key].label, name: ele + DWobj[key].name,value:ele, key: key, type: 'hard' })
            })
          } else{
            carLevelArr.map(ele => {
              return tabArr.push({ label: DWobj[key].label, name: hardKeyNameObj[ele] + DWobj[key].name, value: ele, key: key, type: 'hard' })
            })
          }
        }else{ 
          if (key == 'brandId') {
            let brand = carBrand[ele] || {}
            ele = brand.brandName
          }
          if (key == 'driverYears') {
            ele = AgeObj2[ele]
          }
          if (key == 'kilometres') {
            ele = mileageObj2[ele]
          }
          if (key == 'gearboxType') {
            ele = gearboxTypeObj[ele]
          }
          // typeof ele
          tabArr.push({ label: DWobj[key].label, name: ele + DWobj[key].name, key: key,type:'simple' })
        }
      }
    }
    
    setTabArr(tabArr);

    let CarLevelArr = getHardlDF('carLevels')

    setCarLevelDF(CarLevelArr)
  }, [router.asPath])
  
  return (
    <div>
      <div className="screen">
        <div className="screenItem">
          <div className="screen-l">
            <div className="brand-top">
              <div className="screenTit">品牌</div>
              <div className="brand">
                <div onClick={()=>{delTab({key:'brandId'})}}  className={`brandItem ${!query.brandId?'active':''}`}>不限</div>
                {
                  productArr.map((ele,index)=>(
                    <div key={index} onClick={()=>{setSelectItem('brandId',ele.value)}} className={`brandItem ${query.brandId == ele.value?'active':''}`}>{ele.label}</div>
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
                <div onClick={()=>{delTab({key:'retailPrice'})}} className={`brandItem ${!query.retailPrice ?'active':''}`} >不限</div>
                {
                  priceArr2.map((ele,index)=>(
                    <div onClick={() => { setSelectItem('retailPrice', ele.value) } } className = { `brandItem ${query.retailPrice==ele.value ?'active':''}` } key = { index } >
                      {ele.label}
                    </div>
                  ))
                }
                <div className="">
                  <InputNumber size="small" onChange={(e)=>{setPriceMin(e)}} defaultValue={retailPriceMin} value={retailPriceMin} style={{width:'70px'}} min={0} max={999} step={1}  precision={0}/>
                  <span> - </span>
                  <InputNumber size="small" onChange={(e)=>{setPriceMax(e)}} defaultValue={retailPriceMax} value={retailPriceMax} style={{width:'70px'}} min={0} max={999} step={1} precision={0} />
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
                  
                  <Select defaultValue={query.driverYears} placeholder='车龄' onChange={(value)=>{value=='不限'?delTab({key:'driverYears'}):setSelectItem('driverYears', value) }} style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      AgeArr2.map((ele, index) => (
                        <Option key={index} value={ele.value}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem ">
                  <Select defaultValue={query.kilometres} placeholder='里程' onChange={(value)=>{value=='不限'?delTab({key:'kilometres'}):setSelectItem('kilometres', value) }} style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      mileageArr2.map((ele, index) => (
                        <Option key={index} value={ele.value}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem ">
                  <Select defaultValue={query.standard}   placeholder="排放标准" onChange={(value)=>{value=='不限'?delTab({key:'standard'}):setSelectItem('standard', value) }}  style={{ width: 140 }} >
                    <Option  value='不限'>不限</Option>
                    {
                      standardArr2.map((ele, index) => (
                        <Option key={index} value={ele.value}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem " >
                  <Select value = { carLevelDF } placeholder = "车辆种类"
                  maxTagCount = { 1 } mode = "tags"
                  onChange = {(value) => {setSelectItem('carLevels', value, 'hard') } } style = { { width: 200 } } >
                    {
                      carLevelsArr.map((ele, index) => (
                        <Option key={ele.label} value={ele.label}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className="brandItem " >
                  <Select Select value = { query.gearboxType } placeholder = "变速箱"
                  onChange = { (value) => { value=='不限'?delTab({key:'gearboxType'}):setSelectItem('gearboxType', value) } } style = { { width: 140 } } >
                    <Option  value='不限'>不限</Option>
                    {
                      gearboxTypeArr.map((ele, index) => (
                        <Option key={index} value={ele.value}>{ele.label}</Option>
                      ))
                    }
                  </Select>
                </div>
                
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
          <p className="tit">当前筛选：</p>
          <div className="filter">
            {
              tabArr.map((ele,index)=>(
                <div className="filterItem" key={index+ele.name} onClick={()=>{delTab(ele)}}>
                  <span>{ele.label?ele.label+'：':''}</span>
                  {ele.name}
                  <Icon type="close" style={{marginLeft:'6px',fontSize:'12px'}}/>
                </div>
              ))
            }
            
          </div>
        </div>
        <Link href={{pathname:`/buyCar/${router.query.cityName}`}}>
          <a style={{display:tabArr.length?'block':'none'}} ><div className="reset">重置条件</div></a>
        </Link>
        {/* <div className="num" style={{display:tabArr.length?'block':'none'}}>
          为您找到
          <span style={{color:"#333"}}> <CountTo to={totalCar} speed={1000} /> </span>
          辆好车
        </div> */}
      </div>
    </div>
  )
}


export default Screen;