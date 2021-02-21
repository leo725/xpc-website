import React, {useEffect,useState} from 'react';
import '../public/style/pages/about.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Foot from '../components/Foot'
import { getArticlePage, getCompanyNews, dealcount } from '../public/api'
import {Pagination, Empty} from 'antd'
import Link from 'next/link'
import Router from  'next/router'
import { withRouter } from 'next/router'
import { filterParams } from '../public/js/vx'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/effectScatter';
import 'echarts/map/js/china.js' // 引入中国地图数据


const sellCar = (props) => {
  const {newsList,type,total,pageSize = 6} = props;
  var pageIndex = parseInt(props.pageIndex)
  var chart = null
  const [videoUrl, setVideoUrl] = useState('https://xiaopang-oss.oss-cn-hangzhou.aliyuncs.com/video/%E5%B0%8F%E8%83%96%E8%BD%A633M.mp4')
  const [typeName] = useState({ gsdt: '公司动态', xpczx: '新闻中心', about:'关于我们' })
  useEffect(() => {
    chinaConfigure()
    console.log(newsList);
    return () => {
     
    }

  }, [])

  function changeNav(type,pageIndex){
    if(type=='about'){
      Router.push('/about')
    }else{
      Router.push({
        pathname:'/about',
        query:filterParams({
          type,
          pageIndex
        })
      },`/about/${type}/${pageIndex}`)
    }
  }

  function setOptions() {
    let data = props.countData.data.carAgentDistributionViews
    let geoCoordMap = {
      '海门': [121.15, 31.89],
      '鄂尔多斯': [109.781327, 39.608266],
      '招远': [120.38, 37.35],
      '舟山': [122.207216, 29.985295],
      '齐齐哈尔': [123.97, 47.33],
      '盐城': [120.13, 33.38],
      '赤峰': [118.87, 42.28],
      '青岛': [120.33, 36.07],
      '乳山': [121.52, 36.89],
      '金昌': [102.188043, 38.520089],
      '泉州': [118.58, 24.93],
      '莱西': [120.53, 36.86],
      '日照': [119.46, 35.42],
      '胶南': [119.97, 35.88],
      '南通': [121.05, 32.08],
      '拉萨': [91.11, 29.97],
      '云浮': [112.02, 22.93],
      '梅州': [116.1, 24.55],
      '文登': [122.05, 37.2],
      '上海': [121.48, 31.22],
      '攀枝花': [101.718637, 26.582347],
      '威海': [122.1, 37.5],
      '承德': [117.93, 40.97],
      '厦门': [118.1, 24.46],
      '汕尾': [115.375279, 22.786211],
      '潮州': [116.63, 23.68],
      '丹东': [124.37, 40.13],
      '太仓': [121.1, 31.45],
      '曲靖': [103.79, 25.51],
      '烟台': [121.39, 37.52],
      '福州': [119.3, 26.08],
      '瓦房店': [121.979603, 39.627114],
      '即墨': [120.45, 36.38],
      '抚顺': [123.97, 41.97],
      '玉溪': [102.52, 24.35],
      '张家口': [114.87, 40.82],
      '阳泉': [113.57, 37.85],
      '莱州': [119.942327, 37.177017],
      '湖州': [120.1, 30.86],
      '汕头': [116.69, 23.39],
      '昆山': [120.95, 31.39],
      '宁波': [121.56, 29.86],
      '湛江': [110.359377, 21.270708],
      '揭阳': [116.35, 23.55],
      '荣成': [122.41, 37.16],
      '连云港': [119.16, 34.59],
      '葫芦岛': [120.836932, 40.711052],
      '常熟': [120.74, 31.64],
      '东莞': [113.75, 23.04],
      '河源': [114.68, 23.73],
      '淮安': [119.15, 33.5],
      '泰州': [119.9, 32.49],
      '南宁': [108.33, 22.84],
      '营口': [122.18, 40.65],
      '惠州': [114.4, 23.09],
      '江阴': [120.26, 31.91],
      '蓬莱': [120.75, 37.8],
      '韶关': [113.62, 24.84],
      '嘉峪关': [98.289152, 39.77313],
      '广州': [113.23, 23.16],
      '延安': [109.47, 36.6],
      '太原': [112.53, 37.87],
      '清远': [113.01, 23.7],
      '中山': [113.38, 22.52],
      '昆明': [102.73, 25.04],
      '寿光': [118.73, 36.86],
      '盘锦': [122.070714, 41.119997],
      '长治': [113.08, 36.18],
      '深圳': [114.07, 22.62],
      '珠海': [113.52, 22.3],
      '宿迁': [118.3, 33.96],
      '咸阳': [108.72, 34.36],
      '铜川': [109.11, 35.09],
      '平度': [119.97, 36.77],
      '佛山': [113.11, 23.05],
      '海口': [110.35, 20.02],
      '江门': [113.06, 22.61],
      '章丘': [117.53, 36.72],
      '肇庆': [112.44, 23.05],
      '大连': [121.62, 38.92],
      '临汾': [111.5, 36.08],
      '吴江': [120.63, 31.16],
      '石嘴山': [106.39, 39.04],
      '沈阳': [123.38, 41.8],
      '苏州': [120.62, 31.32],
      '茂名': [110.88, 21.68],
      '嘉兴': [120.76, 30.77],
      '长春': [125.35, 43.88],
      '胶州': [120.03336, 36.264622],
      '银川': [106.27, 38.47],
      '张家港': [120.555821, 31.875428],
      '三门峡': [111.19, 34.76],
      '锦州': [121.15, 41.13],
      '南昌': [115.89, 28.68],
      '柳州': [109.4, 24.33],
      '三亚': [109.511909, 18.252847],
      '自贡': [104.778442, 29.33903],
      '吉林': [126.57, 43.87],
      '阳江': [111.95, 21.85],
      '泸州': [105.39, 28.91],
      '西宁': [101.74, 36.56],
      '宜宾': [104.56, 29.77],
      '呼和浩特': [111.65, 40.82],
      '成都': [104.06, 30.67],
      '大同': [113.3, 40.12],
      '镇江': [119.44, 32.2],
      '桂林': [110.28, 25.29],
      '张家界': [110.479191, 29.117096],
      '宜兴': [119.82, 31.36],
      '北海': [109.12, 21.49],
      '西安': [108.95, 34.27],
      '金坛': [119.56, 31.74],
      '东营': [118.49, 37.46],
      '牡丹江': [129.58, 44.6],
      '遵义': [106.9, 27.7],
      '绍兴': [120.58, 30.01],
      '扬州': [119.42, 32.39],
      '常州': [119.95, 31.79],
      '潍坊': [119.1, 36.62],
      '重庆': [106.54, 29.59],
      '台州': [121.420757, 28.656386],
      '南京': [118.78, 32.04],
      '滨州': [118.03, 37.36],
      '贵阳': [106.71, 26.57],
      '无锡': [120.29, 31.59],
      '本溪': [123.73, 41.3],
      '克拉玛依': [84.77, 45.59],
      '渭南': [109.5, 34.52],
      '马鞍山': [118.48, 31.56],
      '宝鸡': [107.15, 34.38],
      '焦作': [113.21, 35.24],
      '句容': [119.16, 31.95],
      '北京': [116.46, 39.92],
      '徐州': [117.2, 34.26],
      '衡水': [115.72, 37.72],
      '包头': [110, 40.58],
      '绵阳': [104.73, 31.48],
      '乌鲁木齐': [87.68, 43.77],
      '枣庄': [117.57, 34.86],
      '杭州': [120.19, 30.26],
      '淄博': [118.05, 36.78],
      '鞍山': [122.85, 41.12],
      '溧阳': [119.48, 31.43],
      '库尔勒': [86.06, 41.68],
      '安阳': [114.35, 36.1],
      '开封': [114.35, 34.79],
      '济南': [117, 36.65],
      '德阳': [104.37, 31.13],
      '温州': [120.65, 28.01],
      '九江': [115.97, 29.71],
      '邯郸': [114.47, 36.6],
      '临安': [119.72, 30.23],
      '兰州': [103.73, 36.03],
      '沧州': [116.83, 38.33],
      '临沂': [118.35, 35.05],
      '南充': [106.110698, 30.837793],
      '天津': [117.2, 39.13],
      '富阳': [119.95, 30.07],
      '泰安': [117.13, 36.18],
      '诸暨': [120.23, 29.71],
      '郑州': [113.65, 34.76],
      '哈尔滨': [126.63, 45.75],
      '聊城': [115.97, 36.45],
      '芜湖': [118.38, 31.33],
      '唐山': [118.02, 39.63],
      '平顶山': [113.29, 33.75],
      '邢台': [114.48, 37.05],
      '德州': [116.29, 37.45],
      '济宁': [116.59, 35.38],
      '荆州': [112.239741, 30.335165],
      '宜昌': [111.3, 30.7],
      '义乌': [120.06, 29.32],
      '丽水': [119.92, 28.45],
      '洛阳': [112.44, 34.7],
      '秦皇岛': [119.57, 39.95],
      '株洲': [113.16, 27.83],
      '石家庄': [114.48, 38.03],
      '莱芜': [117.67, 36.19],
      '常德': [111.69, 29.05],
      '保定': [115.48, 38.85],
      '湘潭': [112.91, 27.87],
      '金华': [119.64, 29.12],
      '岳阳': [113.09, 29.37],
      '长沙': [113, 28.21],
      '衢州': [118.88, 28.97],
      '廊坊': [116.7, 39.53],
      '菏泽': [115.480656, 35.23375],
      '合肥': [117.27, 31.86],
      '武汉': [114.31, 30.52],
      '大庆': [125.03, 46.58]
    };

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].cityName];
        if (geoCoord) {
          res.push({
            // name: data[i].cityName,
            cityName: data[i].cityName,
            agentNum: data[i].agentNum,
            value: geoCoord.concat(data[i].agentNum)
          });
        }
      }
      return res;
    };

    var option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        show: false
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: false,
        zoom: 1.13,
        itemStyle: {
          normal: {
            areaColor: 'transparent',
            borderColor: '#6c8ce6',
            borderWidth:1
          },
          emphasis: {
            areaColor: '#A8BFFF'
          }
        }
      },
      series: [
        {
          data: convertData(data),
          name: '推荐人',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
            scale: 4,
            period: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              // console.log(params);
              
              return params.data.cityName + '<br />' + params.seriesName + params.data.agentNum + '人';
            }
          },
          symbolSize: function (val) {
            return val[1] / 6;
          },
          itemStyle: {
            normal: {
              color: 'rgba(255, 115, 0, 1)' //点
            }
          }
        },
        // {
        //   name: 'Top 5',
        //   type: 'effectScatter',
        //   coordinateSystem: 'geo',
        //   data: convertData(data.sort(function (a, b) {
        //     return b.value - a.value;
        //   }).slice(0, 6)),
        //   symbolSize: function (val) {
        //     return val[2] / 10;
        //   },
        //   showEffectOn: 'render',
        //   rippleEffect: {
        //     brushType: 'stroke'
        //   },
        //   hoverAnimation: true,
        //   label: {
        //     normal: {
        //       formatter: '{b}',
        //       position: 'right',
        //       show: true
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#f4e925',
        //       shadowBlur: 10,
        //       shadowColor: '#333'
        //     }
        //   },
        //   zlevel: 1
        // }
      ]
    };
    chart.setOption(option)
  }
  function chinaConfigure() {

    chart = echarts.init(document.getElementById('echart'))
    setOptions()
  }



  return (
    <div className='about-container'>
      <MetaHead type="gywm"></MetaHead>
      {/* 固定的头部导航 */}
      <Header allFixed={true}></Header>
      <div className='about-header'></div>
      <SiderNav></SiderNav>
      <div className='about-main'>
        <div className='main-title'>
          <div>
            首页 > 关于小胖车 > { typeName[type] }
          </div>
          <ul className='about-nav'>
            <li className={type=='xpczx'?'active':''} onClick={()=>{changeNav('xpczx',1)}}>
              <img src={require(type=='xpczx'?'../public/img/about-icon-news2.png':'../public/img/about-icon-news.png')} />
              <span>新闻中心</span>
            </li>
            <li className={type=='gsdt'?'active':''} onClick={()=>{changeNav('gsdt',1)}}>
              <img src={require(type=='gsdt'?'../public/img/about-icon-dt2.png':'../public/img/about-icon-dt.png')} />
              <span>公司动态</span>
            </li>
            <li className={type=='about'?'active':''} onClick={()=>{changeNav('about')}}>
              <img src={require(type=='about'?'../public/img/about-icon-us2.png':'../public/img/about-icon-us.png')} />
              <span>关于我们</span>
            </li>
          </ul>
        </div>
        <div className='main-box'>
          
          <div className='main-box-r'>
            {
              newsList.length>0?(
                <div className='main-list-box' style={{display:type!=='about'?'block':'none'}}>
                  <ul className='list-ul'>
                    {
                      newsList.map((ele,index)=>{
                        if(type=='xpczx'){
                          return(
                            // <li className='item' key={index}>
                            //   <div className='img-box'>
                            //     <img src={ele.coverImg} />
                            //   </div>
                            //   <div className='list-content'>
                            //     <Link href={'/newsDetail?type=xpczx&id='+ele.id} key={index} as={`/newsDetail/xpczx/${ele.id}`}>
                            //       <a className='list-title' target='_blank'>{ele.title}</a>
                            //     </Link>
                            //     {/* <p></p> */}
                            //     <div className='info'>
                            //       <span>发表时间：{ele.createTime}</span>
                            //       <span>作者：{ele.author}</span>
                            //     </div>
                            //     <p className='introduction'>{ele.introduction}</p>
                            //   </div>
                            // </li>
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
                                    <Link  href = { '/newsDetail?type=xpczx&id=' + ele.id } key = { index } as = { `/newsDetail/xpczx/${ele.id}` } >
                                      <a target='_blank'><img src={require('../public/img/jiantou-r.png')} alt=""/> 了解详情</a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }else{
                          return(
                            <li className='item' key={index}>
                              <div className='img-box'>
                                <img src={ele.filePath} />
                              </div>
                              <div className='list-content'>
                                <Link href={'/newsDetail?type=gsdt&id='+ele.id} key={index} as={`/newsDetail/gsdt/${ele.id}`}>
                                  <a className='list-title' target='_blank'>{ele.title}</a>
                                </Link>
                                <div className='info'>
                                  <span>发表时间：{ele.issueTime.split(' ')[0]}</span>
                                  <span>作者：{ele.operatorName}</span>
                                </div>
                                <p className='introduction'>{ele.intro}</p>
                              </div>
                            </li>
                          )
                        }
                      })
                    }
                  </ul>
                  <div style={ {textAlign: 'center', marginTop: '20px',marginBottom:'30px'}}>
                    <Pagination defaultCurrent={pageIndex} current = { pageIndex } defaultPageSize={pageSize} total={total} hideOnSinglePage={true}
                    onChange={(page,pageSize)=>{
                      window.scrollTo(0,350)
                      changeNav(type,page)
                    }}></Pagination>
                  </div>
                </div>
              ):(
                <Empty description='暂无数据' style={{display:type==='about'?'none':'block'}}/>
              )
            }
            
            <div className='about-box' style={{display:type==='about'?'block':'none'}}>
              <div className='about-logo'>
                <img src={require('../public/img/about-logo.png')} />
              </div>
              <div className='about-txt'>
                <p>小胖车以线上化、透明化为方向，构建以汽车创业人为抓手，以地勤、线下店、系统为 支撑，连接车商和用户的二手车交易平台。</p>

              </div>
              <div className='about-img-box'>
                {/* <img src={require('../public/img/about-img.png')} /> */}
                <div className="videoBox">
                  <video id="videos" muted={true} width="1200" controls="controls" src={videoUrl} autoPlay loop></video>
                </div>
              </div>

              <div className="listTit">
                <img src={require('../public/img/ab-tip-l.png')} />
                <div className="txt">
                  四大支柱
                  <div className="en">FOUR PILLARS</div>
                </div>
                <img src={require('../public/img/ab-tip-r.png')} />
              </div>
              
              <ul className='about-list'>
                <li>
                  <img src={require('../public/img/about-list-0.png')} />
                 
                </li>
                <li>
                  <img src={require('../public/img/about-list-1.png')} />
                  
                </li>
                <li>
                  <img src={require('../public/img/about-list-2.png')} />
                  
                </li>
                <li>
                  <img src={require('../public/img/about-list-3.png')} />
               
                </li>
              </ul>
              <p className="about-txt2">
                小胖车开创新的商业模式，以汽车创业人、金融产品、系统平台和用户转化四根支柱为
                支撑，为车商、用户提供优质产品与体验，如帮卖、直播、检测、拍卖、保险、车源、
                整备、库融、以租代购、卡分期等。
              </p>
              <p className="about-txt2">
                在线下，小胖车采用全新的建店模式， 通过总部直营、 团队加盟、 车商加盟、 汽车交易市场改造四种模式， 让合作伙伴实现数字化、 快周转、 轻松赚。
              </p>
              <p className="about-txt2">
                在未来，小胖车将成为人人放心买卖的二手车交易平台、让人信赖的二手车品牌服务商。
              </p>
              <div className='about-map'>
                <p>小胖车分布图</p>
                {/* <img src={require('../public/img/about-img2.png')} /> */}
                <div style={{height:'712px',width:'100%'}} id="echart" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot></Foot>
    </div>
  )
}

sellCar.getInitialProps = async (props)=>{
  let {pageIndex = 1,pageSize = 6 ,type = 'about'} = props.query;
  var newsList = [],total=0;
  if(type=='xpczx'){
    let res = await getArticlePage({pageIndex,pageSize,categoryId:1});
    if(res.code==0){
      newsList = res.data.tlist
      total = res.data.total
    }
  }else{
    let res = await getCompanyNews({pageIndex,pageSize});
    if(res.code==0){
      newsList = res.data.data.items
      total = res.data.data.recordCount
    }
  }

  let countData = await dealcount({});
  
  return{
    newsList, total, type, pageIndex, countData
  }
}

export default withRouter(sellCar);