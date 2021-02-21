import React, {useEffect,useState,dangerouslySetInnerHTML} from 'react';
import '../public/style/pages/newsDetail.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Foot from '../components/Foot'
import { withRouter } from 'next/router'
import { Breadcrumb } from 'antd';
import { getArticleDetail,getNewsDetail } from  '../public/api'

const newsDetail = ({newsDetail,router})=>{
  const type=router.query.type;
  return (
    <div className='news-detail'>
      <MetaHead type='newsdetail' detailData={{title:newsDetail.title,intro:newsDetail.intro || newsDetail.introduction,type:type=='xpczx'?'新闻中心':'公司动态'}}></MetaHead>
      {/* 固定的头部导航 */}
      <div id="fixedHead" style={{top: 0}}>
        <Header></Header>
      </div>
      <SiderNav></SiderNav>
      <div className='news-main w1200'>
        <div className='crumb'>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
            <Breadcrumb.Item href={`/about/${type}/1`} >{type=='xpczx'?'新闻中心':'公司动态'}</Breadcrumb.Item>
            <Breadcrumb.Item >资讯详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {
          type==='xpczx'?(
            <div className='detail'>
              <p className='title'>{newsDetail.title}</p>
              <div className='info'>
                <span>发表时间：{newsDetail.createTime}</span>
                <span>作者：{newsDetail.author}</span>
              </div>
              <div className='news-content' dangerouslySetInnerHTML={{__html:newsDetail.article}}></div>
            </div>
          ):(
            <div className='detail'>
              <p className='title'>{newsDetail.title}</p>
              <div className='info'>
                <span>发表时间：{newsDetail.issueTime.split(' ')[0]}</span>
                <span>作者：{newsDetail.operatorName}</span>
              </div>
              <div className='news-content' dangerouslySetInnerHTML={{__html:newsDetail.content}}></div>
            </div>
          )
        }
      </div>
      <Foot></Foot>
    </div>
  )
}

newsDetail.getInitialProps = async (props) =>{
  const {id} = props.query
  var newsDetail;
  if(props.query.type==='xpczx'){
    newsDetail= await getArticleDetail({id})
    
  }else{
    newsDetail = await getNewsDetail({articleId:id})
  }
  return {
    newsDetail:newsDetail.data
  }
  
}

export default withRouter(newsDetail);