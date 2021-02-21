import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import {withRouter} from 'next/router'
import { Icon } from 'antd';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../public/style/components/header.scss'
import { getAllCity, getCityList, getOpeningCityList } from '../public/api/index'
import { stopScroll } from '../public/js/vx'
import $vx from '../public/js/vx'
import Router from 'next/router';

const Header = (props) => {
  let { router, noFixed, getList, allFixed } = props
  const [selectCity, setNowCity] = useState(props.nowCity || {}) //
  const location = $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'}
  const asPath = router.asPath
  const [showCityMenu,setCityShow] = useState('none')
  const navItem = [
    { label: '首页', path: '/', otherPath: '/index' }, 
    { label: '我要买车', path: '/buyCar', otherPath: '/buyCar' }, 
    { label: '我要卖车', path: '/sellCar' }, 
    { label: '商务合作', path: '/agent' }, 
    { label: '关于小胖车', path: '/about' }
  ]
  const [cityObj,setCityObj] = useState({cityMap:[],hotCityVOList:[]});
  const [openingCityList, setOpeningCityList] = useState([])
  
  
  const [isfixed, setTop] = useState(false)
  const query = router.query
  
  useEffect(()=>{

    setNowCity(props.nowCity || location)
    if(props.cityList){

    }else{
      /* 从sessionStorage 获取开通城市数据 */
      let localOpeningCityList = $vx.sessionStorage.getItem('openingCityList');
      if(localOpeningCityList){
        setOpeningCityList(localOpeningCityList);
      }else{
        _getOpeningCityList()
      }
      async function _getOpeningCityList(){
        let res = await getOpeningCityList({})
        if(res.code==0){
          setOpeningCityList(res.data);
          $vx.sessionStorage.setItem('openingCityList', res.data);
        }
      }
    }
    

    stopScroll('side')
   
    window.addEventListener('scroll', scrollHander)
    return () => {
      window.removeEventListener('scroll', scrollHander)
    }

  }, [asPath])

  function progress() {
    //进度条
    Router.onRouteChangeStart = (url) => NProgress.start()
    Router.onRouteChangeComplete = () => {
      NProgress.done();
    }
    Router.onRouteChangeError = () => NProgress.done()
  }
  progress();

  function scrollHander() {
    if (window.pageYOffset > 0) {
      // document.body.style.paddingTop= '62px';
      setTop(true)
    } else {
      // document.body.style.paddingTop= '0px';
      setTop(false)
    }
  }
  // 获取城市列表
  const getAllCityFun = async ()=>{
    let res = await getAllCity({});
    if(res.code==0){
      setCityObj(res.data);
      $vx.sessionStorage.setItem('allCitys',res.data);
    }
  }

  // 选择城市
  const changeSelectCity = (city)=>{
    if (!$vx.sessionStorage.getItem('location') || ($vx.sessionStorage.getItem('location').cityCode != city.cityCode)){
      setNowCity(city)
      $vx.sessionStorage.setItem('location', city);
    }
  }

  // 返回 Link 的 as 字符串
  const linkAs = (cityFullPinYin,path)=>{
    let pathName = path ? path : router.pathname == '/'?'/index':router.pathname;
    let queryParams = {...query};
    if(router.pathname == '/buyCar'){
      queryParams.pageIndex = 1;
    }
    let queryArr = [];
    if( pathName != '/index'){
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key) && key !='cityName' && key !== 'userIp') {
          queryArr.push(`${key}=${queryParams[key]}`)
        }
      }
    }
    return `${pathName}/${cityFullPinYin}${queryArr.length?'?'+queryArr.join('&'):''}`
  }

  // 返回 link 的 href 对象 path 如果不传 为当前页
  const linkHref = (ele,path) =>{
    let pathname = path ? path : router.pathname == '/'?'/index':router.pathname;
    let queryParams = pathname == '/index' ? {cityName: ele.cityFullPinYin} : {...query,cityName: ele.cityFullPinYin,pageIndex:1}
    return {pathname, query: queryParams}
  }

  const HeadComponent = (childProps)=>{
    let { childId , childStyle, allFixed } = childProps
    return (
      <div className={'head-container '+allFixed} id={childId} style={childStyle}>
        <div className="head">
          <div className="head-l">
            <Link href={linkHref(location,'/index')} as={linkAs(location.cityFullPinYin,'/index')}><a className="logo" ></a></Link>
            {
              props.showCitySelect ? (
                <div className="city" onMouseEnter={()=>{setCityShow('block')}} onMouseLeave={(e)=>{setCityShow('none')}}>
                  {selectCity.cityName} <span><Icon type="caret-down" theme="filled" style={{marginLeft:'4px',fontSize:'12px'}}/></span>
                </div>
              ):''
            }
          </div>
          <div className="head-r">
            <div className="nav">
              { navItem.map((ele,index)=>(
                <Link   key={index} href={{pathname:ele.otherPath && selectCity.cityFullPinYin ?`${ele.otherPath}/${selectCity.cityFullPinYin}`:ele.path}}><a  className={`${router.pathname==ele.path || router.pathname == ele.otherPath ?'item active':'item'}`}>{ele.label}</a></Link> 
              )) }
            </div>
            <div className="nav-r">
              <div className="phone">热线电话 400-8119-870</div>
              {/* <div className="gang"></div>
              <div className="login">登陆</div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="headdiv">
      {
        props.showCitySelect ? (
          <div className="cityMenu"style={{display:showCityMenu}}>
            <div id="side"  onMouseEnter={()=>{setCityShow('block')}} onMouseLeave={()=>{setCityShow('none')}} >
              <div className='list-box hot-city'>
                {/* <i className='label'>热门</i> */}
                <ul className='city-list'>
                  <li onClick={changeSelectCity.bind(this,{cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'})} className={selectCity.cityName=='全国'?'active':''}>
                    <Link href={linkHref({cityName:'全国',cityFullPinYin:'country'})} as={linkAs('country')}>
                      <a>全国</a>
                    </Link>
                  </li>
                  {
                    props.cityList && props.cityList.length ? props.cityList.map((ele,index)=>{
                      let html = ''
                      if(ele.state==1){
                        html = (
                          <li key = { ele.cityCode + index } className = { selectCity.cityCode == ele.cityCode ? 'active' : '' } onClick = { changeSelectCity.bind(this, ele) } >
                            <Link href={linkHref(ele)} as={linkAs(ele.cityFullPinYin)}>
                              <a>{ele.cityName}</a>
                            </Link>
                          </li>
                        )
                      }
                      return html
                    }) :openingCityList.map((ele,index)=>{
                      let html = ''
                      if(ele.state==1){
                        html = (
                          <li key = { ele.cityCode + index } className = { selectCity.cityCode == ele.cityCode ? 'active' : '' } onClick = { changeSelectCity.bind(this, ele) } >
                            <Link href={linkHref(ele)} as={linkAs(ele.cityFullPinYin)}>
                              <a>{ele.cityName}</a>
                            </Link>
                          </li>
                        )
                      }
                      return html
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        ):''
      }
      
      <div style={{display:noFixed?'none':'block'}} >
        <HeadComponent childId='fixedHead' childStyle={{top: isfixed?'0':'-90px'}} />
      </div>
      <HeadComponent childId={allFixed?'fixedHead':''} allFixed={allFixed?'fixedHead-all':''}/>

    </div>
  )
}

export default withRouter(Header);
