import React, { useState,useMemo } from 'react'
import LazyLoad from 'react-lazyload';
import { Empty } from 'antd';
import Link from 'next/link'
import { shortImg } from '../public/js/vx'
import '../public/style/components/carlist.scss'
import ReserveDialog from '../components/ReserveDialog'

const CarList = ({ currHotList=[] }) => {

  const [visible,setVisible] = useState(false)
  const [currentCar,setCurrentCar] = useState({})
  const hotList = useMemo(() => currHotList, [currHotList])
  return (
    <div className="carList w1200">
      <div className="listBox" >
        {
          hotList.map((ele, index) => (
            <div className="carItem" key={ele.id}>
              <Link href={{pathname:'/buyCarDetail',query:{id:ele.id}}} as={`/buyCarDetail/${ele.id}`}>
                <a target="_blank">
                  <LazyLoad height={213} offset={200}  placeholder={<img style={{maxHeight:213}} src={require('../public/img/loading2.gif')} />} >
                    <div className="itemp"><img src={shortImg(ele.img.filePath,'530')} alt={ele.sellTitle}/></div>
                  </LazyLoad>
                  <h2 className="t">{ele.sellTitle}</h2>
                  <div className="t-i">
                    { ele.plateYear }年
                    <span className="icon-pad">|</span>
                    {ele.kilometres}  万公里
                    <span className="icon-pad">|</span>
                    {ele.cityName}
                  </div>
                </a>
              </Link>
              <div className="t-price">
                <div className="pri">{ele.retailPrice.toFixed(2)}<span>万</span></div>
                {/* <em className="line-through">{ele.retailPrice}万</em> */}
                <div className="xunjia" onClick={()=>{setCurrentCar(ele);setVisible(true);}}>询价</div>
              </div>
            </div>
          ))
        }
      </div>
      <Empty description={'暂无车源'} style={{display:!currHotList.length?'block':'none',height:'200px',paddingTop:'60px'}} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
      {/* 预约看车 */}
      <ReserveDialog hideDialog={()=>{setVisible(false)}} visible={visible} carDetail={currentCar} title='我要询价'></ReserveDialog>
    </div>
  )
}

export default CarList;