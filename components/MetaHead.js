import React,{useEffect} from 'react'
import Head from 'next/head'
import $vx from '../public/js/vx'

const MetaHead = (props)=>{
  let {router} = props
  let location = props.location || $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'};
  let type = props.type || 'all'
  let detailData = props.detailData || {};

  useEffect(()=>{
    location = props.location || $vx.sessionStorage.getItem('location') || { cityName: '全国', cityCode: '000000', cityFullPinYin: 'country'};
  },[]);

  let headObj = {
    all:{
      tit: `【${location.cityName}二手车-${location.cityName}二手车交易市场】- 小胖车二手车`,
      keywords: `卖车,收车,二手车,小胖车,小胖车官网,${location.cityName}买车,${location.cityName}卖车,${location.cityName}收车,${location.cityName}二手车，二手车全国买全国卖`,
      desc: `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车`
    },
    wybuy:{
      tit: `【${location.cityName}二手车-${location.cityName}二手车交易市场】- 小胖车二手车`,
      keywords: `买车,买车网,${location.cityName}二手车,${location.cityName}二手车出售,${location.cityName}二手车转让,${location.cityName}二手车网站,${location.cityName}私人二手车,${location.cityName}私家车出售转让`,
      desc: `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车`
    },
    wysell:{
      tit: `【${location.cityName}二手车-${location.cityName}二手车交易市场】- 小胖车二手车`,
      keywords: `卖车,收车,二手车,小胖车,小胖车官网,全国卖车,全国收车,全国二手车,二手车全国买全国卖`,
      desc: `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车`
    },
    jjr:{
      tit: `【${location.cityName}二手车-${location.cityName}二手车交易市场】- 小胖车二手车 - 商务合作`,
      keywords: `卖车,收车,二手车,小胖车,小胖车官网,全国卖车,全国收车,全国二手车,二手车全国买全国卖,小胖推荐人，小胖车推荐人，车商，推荐人，人人都是车商`,
      desc: `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车`
    },
    gywm:{
      tit: '小胖车-一个提供一对一专属管家服务的二手车交易平台 - 关于小胖车二手车',
      keywords: '关于小胖车,公司动态,小胖车资讯,卖车,收车,二手车,小胖车,小胖车官网,全国卖车,全国收车,全国二手车,二手车全国买全国卖',
      desc: '小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车'
    },
    cardetail:{
      tit: `${detailData.cityName}-${detailData.modelName}-小胖车二手车`,
      keywords: `卖车,收车,二手车,小胖车,${location.cityName}买车,${location.cityName}卖车,${location.cityName}收车,${detailData.brandName},${location.cityName}二手车,${detailData.catenaName},${detailData.modelName},二手车全国买全国卖`,
      desc:  `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车`
    },
    newsdetail:{
      tit: `【${detailData.type}】${detailData.title} -小胖车二手车`,
      keywords:`小胖车新闻,小胖车公司动态,二手车,二手车动态,二手车资讯,${detailData.intro}`,
      desc: `小胖车-一个提供一对一专属管家服务的二手车交易平台.愿景：人人都能放心买卖二手车！全国卖车_全国收车_全国二手车.【${detailData.type}】${detailData.intro}`
    }
  }
  let nowHead = headObj[type]

  useEffect(() => {
    var _hmt = _hmt || [];
    (() => {
      let baiduHm = document.getElementById('baiduHm');
      if (!baiduHm){
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?adc598cb678414e4c36874a0414cacdc";
        hm.id = 'baiduHm'
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      }
    })()
  }, [])


  return (
    <Head>
      <title>{nowHead.tit}</title>
      <link rel='icon' href={require('../public/favicon.ico')} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
      <meta name="viewport" content="initial-scale=0.3, maximum-scale=0.5, minimum-scale=0.3, user-scalable=yes" />
      <meta name="renderer" content="webkit"/>
      <meta name="keywords" content={nowHead.keywords} />
      <meta name = "Description" content = {nowHead.desc} />
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.14&key=69dfa52c5cc477b041e0129edbb149a0"></script>
      <script src="https://webapi.amap.com/ui/1.0/main.js"></script>
    </Head>
  )
}

export default MetaHead;