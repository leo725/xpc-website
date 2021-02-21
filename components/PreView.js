import React, { useState,useEffect } from 'react';
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.min.css'
import '../public/style/components/preview.scss'
import { shortImg } from '../public/js/vx'
import { Icon } from 'antd';
import { stopScroll } from '../public/js/vx'

const PreView = (props)=> {
  const [thumbsSwiper,setThumb] = useState(null)
  const [gallerySwiper,setGallery] = useState(null)
  const [imgList] = useState(props.imgList || [])
  const index = props.currentIndex
  const [currIndex, setCurrIndex] = useState(index)
  
  useEffect(() => {
   
    stopScroll('detail_mask')
    if(!thumbsSwiper){

    }

    if(!gallerySwiper){
      const thumb = new Swiper('#thumbsp', {
        spaceBetween: 10,
        slidesPerView: 7,
        watchSlidesVisibility: true, //防止不可点击
      })
      setThumb(thumb)
      const gall = new Swiper('#galleryp', {
        spaceBetween: 10,
        zoom: {
          maxRatio: 2,
        },
        thumbs: {
          swiper: thumb,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: function () {

            setCurrIndex(gall.activeIndex)
            // console.log(gallerySwiper.activeIndex);
          }
        }
      })
      setGallery(gall)
      gall.slideTo(index, 0, false); //切换到第一个slide，速度为1秒
    } else{
      gallerySwiper.slideTo(index, 0, false); //切换到第一个slide，速度为1秒
    }

    

  }, [props.showMask])

  return (
    <div className="viewMask" id="detail_mask"  style={{zIndex:props.showMask?'99999':'-1',opacity:props.showMask?'1':'0'}}>
      <div className="viewcha" onClick={()=>{
        props.isShowMask();
        // gallerySwiper.slideTo(index, 0, false);
      }}><Icon type="close-circle" theme="filled" /></div>
      <div className="viewBox">
        <div id="galleryp" key="preview"  className="swiper-container" style={{width:1190}}>
          <div className="swiper-wrapper">
            {
              imgList.map((item,index)=>(
                <div className="swiper-slide" key={index} >
                  <div className="swiper-zoom-container">
                    <img src={shortImg(item.filePath,1190)} alt=" "/>
                  </div>
                </div>
              ))
            }
          </div>
          <div className = "num" > 
          <div className = "tit" > { props.sellTitle } { imgList[currIndex].position } </div>
            <div className="numindex"><span > { currIndex+1 } </span>/ { imgList.length }</div>
          </div>
          <div  className="swiper-button-prev swiper-button-white"></div>
          <div  className="swiper-button-next swiper-button-white"></div>
        </div>
    
        <div id="thumbsp"  key="preview2" className="swiper-container" style={{width:1190}}>
          <div className="swiper-wrapper">
            {
              imgList.map((item,index)=>(
                <div className="swiper-slide" key={index} >
                  <img src={shortImg(item.filePath,190)} alt=" "/>
                </div>
              ))
            }
          </div>
          {/* <div className="swiper-button-prev thumbs-btn"></div>
          <div className="swiper-button-next thumbs-btn"></div> */}
        </div>
      </div>
    </div>
  )
  
}

export default PreView;