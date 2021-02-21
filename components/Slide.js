import React, { useState,useEffect } from 'react';
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.min.css'
import '../public/style/components/slide.scss'
import { shortImg } from '../public/js/vx'

const Slide = (props) => {
  const [imgList] = useState(props.imgList || [])
  const [showBtn,setShowBtn] = useState(false)
  

  useEffect(() => {

    let thumbsSwiper = new Swiper('#thumbs', {
      spaceBetween: 10,
      slidesPerView: 5,
      watchSlidesVisibility: true, //防止不可点击
    })
    let gallerySwiper = new Swiper('#gallery', {
      spaceBetween: 10,
      thumbs: {
        swiper: thumbsSwiper,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {

          props.slideToImg(gallerySwiper.activeIndex)
        }
      }
    })
    


  }, [])


  return (
    <>
      <div id="gallery" style={{width:600}} onMouseOut={()=>{setShowBtn(false)}} onMouseOver={()=>{setShowBtn(true)}} className="swiper-container" >
        <div className="swiper-wrapper">
          {
            imgList.map((item,index)=>(
              <div onClick={()=>{props.viewToImg(index);props.isShowMask()}} className="swiper-slide" key={index} >
                <img src={shortImg(item.filePath,600)} alt=" "/>
              </div>
            ))
          }
        </div>
        <div className="num"><span>{props.currentIndex+1}</span>/{imgList.length}</div>
        <div style={{display:showBtn?'block':'none'}} className="swiper-button-prev swiper-button-white"></div>
        <div style={{display:showBtn?'block':'none'}} className="swiper-button-next swiper-button-white"></div>
      </div>
    

      <div id="thumbs" style={{width:600}} onMouseOut={()=>{setShowBtn(false)}} onMouseOver={()=>{setShowBtn(true)}} className="swiper-container">
        <div className="swiper-wrapper">
          {
            imgList.map((item,index)=>(
              <div className="swiper-slide" key={index} >
                <img src={shortImg(item.filePath,284)} alt=""/>
              </div>
            ))
          }
        </div>
        {/* <div className="swiper-button-prev thumbs-btn thumbs-btn-prev"></div>
        <div className="swiper-button-next thumbs-btn thumbs-btn-next"></div> */}
      </div>

      
    </>

  )
  
}

export default Slide;