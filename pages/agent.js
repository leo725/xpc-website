import React,{useEffect,useState,useRef} from 'react'
import '../public/style/pages/agent.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Foot from '../components/Foot'
import { Carousel } from 'antd';

const Agent = ()=>{
  const [isAnimation,setAnimation] = useState(false)
  const [swiperCurrentIndex,setSwiperCurrentIndex] = useState(0);
  const swiperList = [
    { img: require('../public/img/agent-list-0.png'), title: '海量车源', context: '平台提供海量车源供推荐人选择' },
    {img:require('../public/img/agent-list-1.png'),title:'推荐成功赚500',context:'推荐成功平台奖励高额奖励'},
    {img:require('../public/img/agent-list-2.png'),title:'不成交抽红包',context:'推荐未成功还可以抽红包'},
    { img: require('../public/img/agent-list-3.png'), title: '友好互助推荐圈', context: '友好互助的的推荐人圈子' }
  ]
  const swiperEl = useRef(null)
  
  useEffect(() => {
    
    window.addEventListener('scroll', scrollHander)
  
    return () => {
      window.removeEventListener('scroll', scrollHander)
    }
    
  }, [])

  // 轮播切换
  function changeSwiperCurrent(index){
    setSwiperCurrentIndex(index);
    swiperEl.current.goTo(index);
  }

  function scrollHander() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 300 && !isAnimation) {
      let car = document.querySelectorAll(".prize .car")[0];
      setAnimation(true)
      car.classList.add('animationCar')
    }
  }

  return (
    <div className="agent">
      <MetaHead type="jjr"></MetaHead>
      <SiderNav></SiderNav>
      <div id="buyHead"><Header></Header></div>
      <div className="banner">
        <img src={require('../public/img/agent-banner.png')} alt=""/>
      </div>
      <div className="inc-ser">
        <div className="w1200">
          {/* <div className="personNum">
            <div className="label">
              <div className="l-one">经纪人</div>
              <div>和我们一起，促进汽车交易</div>
            </div>
            <div className="person">
              <div className="numItem">1</div>
              <div className="numItem">0</div>
              <div className="numItem">3</div>
              <div className="numItem">8</div>
              <div className="numItem">1</div>
              <div className="numItem">1</div>
              <div className="aftix">人</div>
            </div>
          </div> */}
          <ul className="incItem">
            <li>
              <img src={require('../public/img/agent-i1.png')} alt=""/>
              <div className="tip">人人都是推荐人</div>
              <p>无门槛做推荐人</p>
            </li>
            <li>
              <img src={require('../public/img/agent-i2.png')} alt=""/>
              <div className="tip">覆盖更全面</div>
              <p>专业的全国服务团队</p>
            </li>
            <li>
              <img src={require('../public/img/agent-i3.png')} alt=""/>
              <div className="tip">买车更便宜</div>
              <p>专业服务，无差价</p>
            </li>
            <li>
              <img src={require('../public/img/agent-i4.png')} alt=""/>
              <div className="tip">服务更专业</div>
              <p>3600+专属管家</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="w1200 prize">
        <img src={require('../public/img/agent-hb.png')} alt=""/>
        <img className="car" src={require('../public/img/agent-car.gif')} alt=""/>
      </div>
      {/* 轮播图 */}
      <div className='agent-swiper-container w1200'>
        <ul className='swiper-left'>
          {
            swiperList.map((item,index)=>(
              <li className={swiperCurrentIndex==index?'swiper-left-item active':'swiper-left-item'} key={index} onClick={()=>{changeSwiperCurrent(index)}}>
                <i>0{index+1}</i>
                <div className='swiper-l-div'>
                  <p>{item.title}</p>
                  <span>{item.context}</span>
                </div>
              </li>
            ))
          }
          
        </ul>
        <div className="swiper-container2">
          <Carousel autoplay className="swiper-wrapper" effect="fade" dots={false} afterChange={(e)=>{setSwiperCurrentIndex(e)}} ref={swiperEl}>
            {
              swiperList.map((item,index)=>(
                <div className={swiperCurrentIndex==index?'swiper-slide active':'swiper-slide'} key={index}><img src={item.img} /></div>
              ))
            }
          </Carousel>
          <div className="swiper-button-prev2 swiper-button2" onClick={()=>{swiperEl.current.prev()}}></div>
          <div className="swiper-button-next2 swiper-button2" onClick={()=>{swiperEl.current.next()}}></div>
        </div>
      </div>
      <div className="w1200 cardeer">
        <div className="deerImg"><img src={require('../public/img/agent-cardeer.png')} alt=""/></div>
        <div className="deer">
          <div className="tip">人人是车商</div>
          <p className="desc">门槛低、利用碎片时间赚大钱</p>
        </div>
      </div>
      <div className="w1200 cardeer2">
        <div className="deer" >
          <div className="tip">专业服务团队</div>
          <div className = "desc" > 线下一对一专业服务团队 </div>
          <div className = "desc" > 你的推荐， 我来服务， 专业、 尽心  </div>
          <div className = "desc" > 没有套路， 实在服务  </div>
        </div>
        <div  className="deerImg"><img src={require('../public/img/agent-cardeer2.png')} alt=""/></div>
      </div>
      <Foot></Foot>
    </div>
  )
}

export default Agent;