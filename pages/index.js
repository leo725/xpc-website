import React,{useState,useEffect} from 'react'
import Router from 'next/router';
import { withRouter } from 'next/router'
import '../public/style/pages/index.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Process from '../components/Process'
import CarList from '../components/CarList'
import Foot from '../components/Foot'
import AssessCar from '../components/AssessCar'
import Link from 'next/link'
import { Icon, message, Popover } from 'antd';
import { getListCars, getCarBrandList, getLevelCarList, saveCarSell, getOpeningCityList, getArticlePage, listNormal } from '../public/api/index'
import $vx from '../public/js/vx'
import { priceArr2, productArr, regPhone, isObject, shortImg, carLevelsArr, AgeArr2, } from '../public/js/vx'
import SellCarDialog from '../components/SellCarDialog'
import Cookies from 'js-cookie'

const Home = (props) => {
  let levelCarList = props.levelCarList
  let carBrandList = props.carBrandList || []
  let articleList = props.articleList || []
  let minShopList = props.minShopList || []
  const [currHotType, setCurrHotType] = useState(0)
  const [listCars, setListCars] = useState(props.listCars ||{})
  const [keyWord, setKeyWord] = useState('')
  const [visible, setVisible] = useState(false)
  const [assessVisible, setAssessVisible] = useState(false)
  const [toSellData,setToSellData] = useState({})
  const [positionPicker, setPositionPicker] = useState(null)
  const [shopArea, setShopArea] = useState(0)
  const [isShowVideo, setShowVideo] = useState(0)
  const [videoUrl2, setVideoUrl2] = useState('https://xiaopang-oss.oss-cn-hangzhou.aliyuncs.com/video/%E5%B0%8F%E8%83%96%E8%BD%A633M.mp4')
  // console.log(props);
  // 车俩图片导航
  // const typeArr = [
  //   { a: require('../public/img/navtype1.png'), b: require('../public/img/navtype1a.png'),
  //     key:'retailPrice', value:'5-15'
  //   },
  //   { a: require('../public/img/navtype2.png'), b: require('../public/img/navtype2a.png'), 
  //     key:'retailPrice', value:'10-20'
  //   },
  //   { a: require('../public/img/navtype3.png'), b: require('../public/img/navtype3a.png'),
  //     key:'retailPrice', value:'0-5'
  //   },
  //   { a: require('../public/img/navtype4.png'), b: require('../public/img/navtype4a.png'),
  //     key:'retailPrice', value:'20-999'
  //   }
  // ]

  const [sellTel, setSellTel] = useState('')
  const [sellId, setSellId] = useState('')
  const [currentNav, setCurNav] = useState(0) //当前图片导航
  const [videoWH, setVideoWH] = useState({w:'100%',h:'100%'}) //当前图片导航

  const [hotType ] = useState([
    {queryCarType:2, label: '新上架' },
    {kilometresMax:4,kilometresMin:0,driverYearsMax:2,driverYearsMin:0,label:'准新车'},
    {retailPriceMax:6,retailPriceMin:0,label:'代步练手'},
    {retailPriceMax:13,retailPriceMin:5,label:'上班家用'},
    {retailPriceMax:30,retailPriceMin:10,label:'商务差旅'},
  ])
  const moreType=[
    { key: 'queryCarType', value: 2, label: '热门', name: '新上架' },
    { kilometresMax: 4, kilometresMin: 0, driverYearsMax: 2, driverYearsMin: 0, label: '热门', name: '准新车' },
    { key: 'carLevels', value: '中型SUV-中大型SUV-紧凑型SUV' },
    { key: 'retailPrice', value: '0-5' },
    { key: 'retailPrice', value: '5-10'}
  ]
  
  const [videoUrl, setVideoUrl] = useState('https://xiaopang-oss.oss-cn-hangzhou.aliyuncs.com/video/WebsteVideo201215.mp4')

  const content = (
    <div className="baranAll">
      <div className="baranBox">
        {
          carBrandList.map((item, index) => (
            <div className="baranItem" key={index}>
              <div className="zi">{item.initials}</div>
              <div className="barantxt">
                {
                  item.carBrands.map((ele, i) => (
                    <Link key={i} href={{pathname:`/buyCar/${props.location.cityFullPinYin}`,query:{brandId:ele.id}}}>
                      <a title={ele.brandName}>
                        <div className="cartxt" >
                          {ele.brandName}
                        </div>
                      </a>
                    </Link>
                    
                  ))
                }
              </div>
            </div>
          ))
        }
        
      </div>
    </div>
  )

  useEffect(() => {
    if(props.location){
      $vx.sessionStorage.setItem('location',props.location)
      Cookies.set('website_cityCode',props.location.cityFullPinYin,{expires: 30})
    }
    setListCars(props.listCars)
    initMap()

    window.addEventListener('scroll', hasScroll)
    return () => {
      window.removeEventListener('scroll', hasScroll)
    }
    // async function a(){
    //   const listCars = await getListCars({ pageIndex: 1, pageSize: 12, cityId: '', carType: 2 })
    
  }, [props.listCars])

  const hasScroll = function (e) {
    var e = e;
    var scrolltop = document.documentElement.scrollTop ;
    if (scrolltop > 230) {
      document.getElementById("buybox").style.height = 200 + 'px';
      document.getElementById("buysell").style.top = -100 + 'px';
    } else {
      document.getElementById("buybox").style.height = 340 + 'px';
      document.getElementById("buysell").style.top = 40 + 'px';
    }

  }

  const getList = async (params,index)=>{
    if(currHotType==index) return false
    let {label,...other} = params
    let location = $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'}
    const listCars = await getListCars({ pageIndex: 1, pageSize: 12, carType: 2,cityName: location.cityFullPinYin,  ...other })
    setListCars(listCars.data.pageDataVO)
    
  }
  const getCarList = async ()=>{
    let location = $vx.sessionStorage.getItem('location')
    let {label,...other} =hotType[0]
    const listCars = await getListCars({ pageIndex: 1, pageSize: 12, carType: 2, ...other, cityName: location.cityFullPinYin })
    setListCars(listCars.data.pageDataVO)
  }


  // 预约卖车
  async function handleSellCar(){
    if(!regPhone(sellTel)){
      return message.warning('请填写正确的手机号');
    }
    let res = await saveCarSell({ mobile: sellTel, source: 'website' });
    if(res.code==0){
      setSellId(res.data)
      setVisible(true)
    } else {
      message.error(res.message)
    }
  }
  // 跳转
  function linkToBuy() {
    let ele = moreType[currHotType]
    let pathname = `/buyCar/${props.location.cityFullPinYin}`;
    if (currHotType==0){  
      Router.push({ pathname, query: { queryCarType: ele.value, } },`${pathname}?queryCarType=${ele.value}`)
    } else if (currHotType==1){
      Router.push({ pathname, query: {
        kilometres: '0-4',
        driverYears: '0-2',
      }}, `${pathname}?kilometres=0-4&driverYears=0-2`)
    }else{
      Router.push({ pathname, query: {
        [ele.key]: typeof ele.value === "object" ? JSON.stringify(ele.value) : ele.value
      }}, `${pathname}?${[ele.key]}=${typeof ele.value === "object" ? JSON.stringify(ele.value) : ele.value}`)
    }
  }

  // 条件选择
  function setSelectItem(key, value) {
    let query = props.router.query
    query[key] = value
    Router.push({ pathname: '/buyCar', query: { ...query, pageIndex: 1 } })
  }

  // 地图
  function initMap() {
    var map = new AMap.Map('container', {
      zoom: 20,
      scrollWheel: true
    })
    AMap.plugin(['AMap.ToolBar'], function () {
      map.addControl(new AMap.ToolBar({
        map: map
      }));
    });
    AMapUI.loadUI(['misc/PositionPicker', 'misc/PoiPicker'], (PositionPicker, PoiPicker) => {
      var posPicker = new PositionPicker({
        mode: 'dragMarker',
        map: map
      });
      setPositionPicker(posPicker)
      posPicker.on('success', (positionResult) => {
        // this.form.latitude = positionResult.position.lat;
        // this.form.longitude = positionResult.position.lng;
        // this.form.addressDetail = positionResult.address;

      });
      posPicker.on('fail', (positionResult) => {
        this.$message({ type: 'error', message: '地图定位失败，请在输入框输入地址，重新定位经纬度！！！' });
      });

      map.panBy(0, 1);
      map.addControl(new AMap.ToolBar({
        liteStyle: true
      }))
      let { longitude, latitude } = minShopList[0]
      posPicker.start([longitude, latitude]);

    });

  }

  return (
    <div>
      <MetaHead location={props.location}></MetaHead>
      {/* 侧边工具栏 */}
      {/* <SiderNav></SiderNav> */}
      <div className="headBox">

        {/* 头部导航 */}
        <Header cityList={props.openingCityList} nowCity={props.location} allFixed={true} getList = { getCarList } showCitySelect={true}> </Header>
        { /* 搜索 */ }
        {/* <div className="search">
          <div className="title"><img src={require('../public/img/index-text.png')} alt=""/></div>
          <div className="serchBox">
            <input type="text"  onChange={(e)=>{
              setKeyWord(e.target.value)
            }} maxLength={20} onKeyDown={(event)=>{if(event.keyCode==13){Router.push({ pathname: `/buyCar/${props.location.cityFullPinYin}`, query: { keyWord:keyWord.trim()} },`/buyCar/${props.location.cityFullPinYin}?keyWord=${keyWord.trim()}`)}}} value={keyWord} placeholder="请输入关键词，例如：保时捷Macan 2.0T"/>
            <Link href={{pathname:`/buyCar/${props.location.cityFullPinYin}`,query:{keyWord:keyWord}}} as={`/buyCar/${props.location.cityFullPinYin}?keyWord=${keyWord.trim()}`}>
              <a>
                <button className="search-btn">搜索</button>
              </a>
            </Link>
          </div>
        </div> */}
        <div className="videoBox">
          <video id="videos" muted width="100%" src={videoUrl} autoPlay loop></video>
          <img className="playBtn" onClick={()=>{
            setShowVideo(!isShowVideo);
            document.getElementById('video2').play()
          }} src={require('../public/img/playBtn.png')} alt=""/>
        </div>
      </div>

      {/* 视频pop */}
      <div className = "videoPop" style = { { display: isShowVideo ? 'block':'none'} } >
        <div className="inner">
          <div className="video">
            <video id="video2" muted={false} controls="controls" width="1200" src={videoUrl2} loop></video>
          </div>
          <div className = "close" onClick = { () => {
            setShowVideo(!isShowVideo);
            document.getElementById('video2').pause()
          }} 
          >
            <i className="line line-1"></i>
            <i className="line line-2"></i>
          </div>
        </div>
      </div>

      {/* 买卖车 */}
      <div  className = "buybox" id= "buybox" >
        <div className="buysell" id="buysell">
          <div className="sell-gou selmodel">
            <div className="tit">
              <Link  href={{pathname:`/buyCar/${props.location.cityFullPinYin}`}}>
                <a>
                  <span>我要买车</span>
                  <img  className="turnLeftBtn" src={require('../public/img/more.png')} alt=""/>
                </a>
              </Link>
            </div>
            <div className="buysearch">
              { 
                priceArr2.map((ele,index)=>(
                  <Link key={index}  href={{pathname:`/buyCar/${props.location.cityFullPinYin}`,query:{retailPrice:ele.value}}} as={`/buyCar/${props.location.cityFullPinYin}?retailPrice=${ele.value}`}>
                    <a title={ele.label} className="buyItem-s">
                      {ele.label}
                    </a>
                  </Link>
                ))
              }
              {
                productArr.map((ele, index) => (
                  <Link key={index} href={{pathname:`/buyCar/${props.location.cityFullPinYin}`,query:{brandId:ele.value}}} as={`/buyCar/${props.location.cityFullPinYin}?brandId=${ele.value}`}>
                    <a title={ele.label} className="buyItem-s" style={{display:index>12?'none':'block'}}>
                      <img src={ele.url} alt={ele.label}/>{ele.label}
                    </a>
                  </Link>
                ))
              }
              
              <Popover content={content} placement="bottom"  trigger="hover">
                <div className="buyItem-s">全部品牌</div>
              </Popover>
              {
                carLevelsArr.map((ele, index) => (
                  <Link key = { index } href = { { pathname: `/buyCar/${props.location.cityFullPinYin}`, query: { carLevels: ele.label } } } as = { `/buyCar/${props.location.cityFullPinYin}?carLevels=${ele.label}` } >
                    <a title = { ele.label } className = "buyItem-s" > { ele.label } </a>
                  </Link>
                ))
              }
              <Link  href = { { pathname: `/buyCar/${props.location.cityFullPinYin}`} } as = { `/buyCar/${props.location.cityFullPinYin}` } >
                <a title = "不限车型" className = "buyItem-s" > 不限车型</a>
              </Link>
              {
                AgeArr2.map((ele, index) => (
                  <Link  key = { index } href = { { pathname: `/buyCar/${props.location.cityFullPinYin}`, query: { driverYears: ele.value } } } as = { `/buyCar/${props.location.cityFullPinYin}?driverYears=${ele.value}` } >
                    <a title={ele.label} className="buyItem-s">
                      {ele.label}
                    </a>
                  </Link>
                ))
              }
              <Link  href = { { pathname: `/buyCar/${props.location.cityFullPinYin}`} } as = { `/buyCar/${props.location.cityFullPinYin}` } >
                <a title = "不限年份" className = "buyItem-s" > 不限年份</a>
              </Link>
            </div>
          </div>
          <div className="sell-mai selmodel">
            <div className="tit">
              <Link  href={{pathname:'/sellCar'}}>
                <a>
                  <span>我要卖车</span>
                  <img className="turnLeftBtn" src={require('../public/img/more.png')} alt=""/>
                </a>
              </Link>
            </div>
            <div className="searchMai">
              <input type="text" maxLength="11"  value={sellTel}
                onChange={()=>{}} 
                onInput={(event)=>{
                  const value = event.target.value.replace(/[^\d]/g, '')
                  setSellTel(value)
                }} 
                placeholder="输入您的手机号"
              />
              <button disabled={visible} onClick={handleSellCar}>预约卖车</button>
            </div>
            <div className="pinggu" onClick={()=>{setAssessVisible(true)}}>
              <span className="gu-tit">爱车评估</span>
              <span>立即评估<Icon type="right" style={{color:'#c05e23',fontSize:'12px'}}/></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="smallCarCont">
        {/* <div className="w1200">
          <div className="carType clearfix">
            <Link  href={{pathname:`/buyCar/${props.location.cityFullPinYin}`,query:{retailPrice:'5-15',}}} as={`/buyCar/${props.location.cityFullPinYin}?retailPrice=5-15`}>
              <a> 
                <div className="carTypeL">
                  <img src={require('../public/img/navtype1.png')} alt=""/>
                </div>
              </a>
            </Link>
            <div className="carTypeR">
                <ul>
                {
                  levelCarList.familyCarList.map((ele,index) => (
                    <li key={index}>
                      <Link href={{pathname:'/buyCarDetail',query:{id:ele.id}}} as={`/buyCarDetail/${ele.id}`}>
                        <a target='_blank'>
                          <img src={ shortImg(ele.img.filePath,'600')} alt={ele.sellTitle}/>
                          <div className="info">
                            <p className="brand">{ele.catenaName}</p>
                            <p className="plate">{ele.plateYear?ele.plateYear+'年 / ':''}{ele.plateMonth?ele.plateMonth+'月':''}</p>
                            <p className="price">{ele.retailPrice.toFixed(2)} <span>万</span></p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="carType clearfix">
            <Link  href={{pathname:`/buyCar/${props.location.cityFullPinYin}`, query:{retailPrice:'20-999',}}} as={`/buyCar/${props.location.cityFullPinYin}?retailPrice=20-999`}>
              <a>
                <div className="carTypeL">
                  <img src={require('../public/img/navtype2.png')} alt=""/>
                </div>
              </a>
            </Link>
            <div className="carTypeR carTypeR2">
                <ul>
                {
                  levelCarList.luxuryList.map((ele, index) => (
                    <li key={index}>
                      <Link href={{pathname:'/buyCarDetail',query:{id:ele.id}}} as={`/buyCarDetail/${ele.id}`}>
                        <a target='_blank'>
                          <img src = { shortImg(ele.img.filePath, '600') } alt = {ele.sellTitle} / >
                          <div className="info">
                            <p className="brand">{ele.catenaName}</p>
                            <p className="plate">{ele.plateYear?ele.plateYear+'年 / ':''}{ele.plateMonth?ele.plateMonth+'月':''}</p>
                            <p className="price">{ele.retailPrice.toFixed(2)} <span>万</span></p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div> */}
        {/* 热卖车 */}
        <div className="hotCar">
          <div className="hotCar-tit">
            <div>热卖车型</div>
            <div className="hotCar-nav">
              { hotType.map((ele,index)=>(
                <div className={`item ${currHotType == index?'active':''}`} onClick={()=>{
                  getList(ele,index)
                  setCurrHotType(index)
                }} key={index}>{ele.label}</div>
              )) }
            </div>
          </div>
          <CarList currHotList={listCars.tlist}></CarList>
          <div className="index-carmore" onClick={()=>{linkToBuy()}} >
            <a>更多{hotType[currHotType].label}<Icon type="right-circle"  style={{marginLeft: '6px'}}  /></a>
          </div>
        </div>
      </div>
      

      { /* 店铺位置 */ }
      <div className = "mapShopBox" >
        <div className = "shopMap w1200" >
          <div  className = "map" >
            <div id="container">
            </div>
          </div>
          <div className="addressBox">
            <div className="tit">销售店分布网络</div>
            <div className="address">
              {
                minShopList.map((ele,index)=>{
                  if (ele.name.indexOf('测试') < 0){
                    return (
                      <div className = { `item ${shopArea == index?'active':''}` } 
                      onClick = {() => { 
                        setShopArea(index);
                        positionPicker.start([ele.longitude, ele.latitude]) 
                      }}
                      key = { index } 
                    >
                      <div className="tip">{ele.name}</div>
                      <div className="phone">
                        <img src={require(shopArea == index?'../public/img/iaddress.png':'../public/img/iaddress2.png')} alt=""/>
                        {ele.address}
                      </div>
                      {/* <div className="adr">
                        <img src={require('../public/img/iaddress.png')} alt=""/>
                        销售热线： 0571 - 87681988
                      </div> */}
                    </div>
                    )
                  } else{
                    return false
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>

      { /* 资讯新闻 */ }
      <div className="newsTit w1200">
        <div className="tit">新闻中心</div>
        <div className="tits">
          <div className="ywtit">NEWS CENTER</div>
          <Link href='/about/xpczx/1'><a>更多 <img className="turnLeftBtn" src={require('../public/img/more.png')} alt=""/></a></Link>
        </div>
      </div>
      <div className = "newsBox w1200" >
        {
          articleList.map((ele, index) => (
            <div className = "newsItem" key = { index } >
              <img src={ele.coverImg}  />
              <div className="content">
                <div className="tit textover1">{ele.title}</div>
                <div className="info textover2"> 
                  {ele.introduction}
                </div>
                <div className="year">{ele.createTime.slice(0,4)}</div>
                <div className="month">
                  <div>{ele.createTime.slice(5,10)}</div>
                  <div className="getMore">
                    <Link href = { '/newsDetail?type=xpczx&id=' + ele.id } key = { index } as = { `/newsDetail/xpczx/${ele.id}` } >
                      <a target='_blank'><img src={require('../public/img/jiantou-r.png')} alt=""/> 了解详情</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        
      </div>

      {/* 流程 */}
      <Process></Process>

      { /* 卖买车 */ }
      <div className="footbuysell">
        <div className="sell">
          
          <div className="sell-r">
            <Link  href={{pathname:`/buyCar/${props.location.cityFullPinYin}`}}>
              <a><button className="sellBtn" >我要买车</button></a>
            </Link>
            <Link  href={{pathname:'/sellCar'}}>
              <a><button className="sellBtn rbtn" >我要卖车 </button></a>
            </Link>
          </div>
        </div>
      </div>

      

      <SellCarDialog sellId={sellId} mobile={sellTel} visible={visible}  hideDialog={()=>{setVisible(false),setToSellData({})}} setMobile={(val)=>{setSellTel(val)}} toSellData={toSellData}/>
      <AssessCar visible={assessVisible} hideDialog={()=>{setAssessVisible(false)}} toSellCar={(mobile)=>{setSellTel(mobile);setVisible(true)}} submitData={(data)=>{setToSellData(data)}}/>
      <Foot cityList = {props.openingCityList}></Foot>
    </div>
  )
}


Home.getInitialProps = async (props) => {
  // console.log(props);
  let articleList = await getArticlePage({ pageIndex: 1, pageSize: 3, categoryId: 1 });
  let minShopList = await listNormal({});
  const levelCarList = await getLevelCarList({ carNum: 4 })
  const carBrandList = await getCarBrandList({})
  const listCars = await getListCars({ pageIndex: 1, pageSize: 12, carType: 2, ...props.query })
  const openingCityList = await getOpeningCityList({});
  return { articleList: articleList.data.tlist, minShopList: minShopList.data, levelCarList: levelCarList.data, carBrandList: carBrandList.data, listCars: listCars.data.pageDataVO, location: listCars.data.cityVO || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country' }, openingCityList: openingCityList.data }
}

export default withRouter(Home)
