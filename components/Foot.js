import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import '../public/style/components/foot.scss'
import $vx from '../public/js/vx'
import { getOpeningCityList } from '../public/api/index'
import { Icon } from 'antd'
import {withRouter} from 'next/router'

const Foot = (props)=>{
  let { router } = props;
  const [openingCityList, setOpeningCityList] = useState([])
  const [showAllOpenCity, setShowAllOpenCity] = useState(false)

  useEffect(()=>{
    /* 从sessionStorage 获取开通城市数据 */
    if(props.cityList){
      return
    }
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
  },[])

  const linkHref = (ele,path) =>{
    return 
  }

  return (
    <div style={{background:'#2a2c37',width:'100%', padding: '40px 0'}}>
      <div className='hot-city-container w1200' style={{height:showAllOpenCity?'auto':'40px'}}>
        <div className='hot-city-list'>
          <Link href={{pathname: `${router.pathname != '/buyCar'?'/index':router.pathname}`,query: {cityName: 'country'}}} as={`${router.pathname != '/buyCar'?'/index':router.pathname}/country`}>
            <a>全国二手车</a>
          </Link>
          {
            props.cityList && props.cityList.length ?
            props.cityList.map((ele,index)=>(
              <Link href={{pathname: `${router.pathname != '/buyCar'?'/index':router.pathname}`, query: {cityName: ele.cityFullPinYin}}} key={ele.cityCode+index} as={`${router.pathname != '/buyCar'?'/index':router.pathname}/${ele.cityFullPinYin}`}>
                <a>{ele.cityName}二手车</a>
              </Link>
            )):openingCityList.map((ele,index)=>(
              <Link href={{pathname: `${router.pathname != '/buyCar'?'/index':router.pathname}`, query: {cityName: ele.cityFullPinYin}}} key={ele.cityCode+index} as={`${router.pathname != '/buyCar'?'/index':router.pathname}/${ele.cityFullPinYin}`}>
                <a>{ele.cityName}二手车</a>
              </Link>
            ))
          }
        </div>
        <div className='hot-city-icon' onClick={()=>{setShowAllOpenCity(!showAllOpenCity)}}>
          <Icon type="down" style={{display:!showAllOpenCity?'block':'none'}} />
          <Icon type="up" style={{display:showAllOpenCity?'block':'none'}} />
        </div>
      </div>
      <div className="foot w1200">
        <div className="introduce">
          <div className="nav">
            <Link href='/about/gsdt/1'><a>公司动态</a></Link>
            <Link href='/about/xpczx/1'><a>新闻中心</a></Link>
            <Link href='/about'><a>关于我们</a></Link>
          </div>
          {/* <div className="address">
            <div><img src={require('../public/img/foot-address.png')} />浙江省杭州市莫干山路972号泰嘉园L座6楼</div>
            <div style={{marginLeft:'20px'}}><img src={require('../public/img/foot-phone.png')} />电话：400-8119-870</div>
          </div> */}
          <p>Copyright  2018 - {new Date().getFullYear()} Xiaopangche All Rights Reserved.</p>
          <p>
            <a className='beian' target="_black" href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502005319'><img src={require('../public/img/beian.png')} />浙公网安备33010502005319号</a>
            <a className='beian' target="_black" href='http://www.beian.miit.gov.cn'>浙ICP备18045882号-1</a>
          </p>
          <p>
             <a className='beian' target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/yinsiWeb.html'>隐私政策</a>
             <a className='beian' target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/userzhuceWeb.html'>用户协议</a>
          </p>
        </div>
        <div className="footlogo"></div>
        <div className="time">
          <div className="phone">400-8119-870</div>
          <div className="worktime">周一至周日 08:30-18:30</div>
          <div className="advice">免费咨询(咨询、建议、投诉)</div>
        </div>
        <div className="code">
          <img className="codema" src={require('../public/img/wechatCode.png')}/>
          <div>小胖车公众号</div>
        </div>
        <div className="code">
          <img className="codema" src={require('../public/img/appCode.png')}/>
          <div>小胖车APP下载</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Foot);

