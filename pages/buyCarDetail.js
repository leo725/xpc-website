import React, { useState, useEffect } from 'react';
import Slide from '../components/Slide'
import PreView from '../components/PreView'
import '../public/style/pages/buyCarDetail.scss'
import MetaHead from '../components/MetaHead'
import Header from '../components/Header'
import SiderNav from '../components/SiderNav'
import Dialog from '../components/Dialog'
import Foot from '../components/Foot'
import ReserveDialog from '../components/ReserveDialog'
import {  getListCarDetail, saveCrmCustomer, getListCars } from '../public/api/index'
import { withRouter } from 'next/router'
import { message, Icon, Empty, Form, Input, Button, Popover, Tag } from 'antd';
import { shortImg, regPhone, gearboxTypeObj } from '../public/js/vx'
import { shareUrl } from '../public/api/config'
import QRCode  from 'qrcode.react'
import FinanceDialog from '../components/FinanceDialog'
import CarList from '../components/CarList'
// 我要优惠弹框
const DiscountForm = (props) =>{
  const {visible,hideDialog,carDetail} = props;
  const {getFieldDecorator, resetFields} = props.form
  const [resVisible, setResVisible] = useState(false)
  // console.log(carDetail);
  // 提交数据
  const handleSubmitForm = (e) =>{
    e.preventDefault();
    props.form.validateFields(async (err,values)=>{
      if(!err){
        let params = Object.assign({
          carModelName: carDetail.modelName,
          sellCarId: carDetail.id,
          source:'website_bargain'
        },values)
        let res = await saveCrmCustomer(params);
        if(res.code==0){
          setResVisible(true)
        }
      }
    })
  }
  // 自定义校验规则
  const mobileValidator = (rule,value,callback) =>{
    if(!!value && !regPhone(value)){
      callback('请输入正确的手机号');
    }else{
      callback()
    }
  }
  
  return (
    <Dialog hideDialog={()=>{props.form.resetFields();hideDialog();}} visible={visible} carDetail={carDetail} hideTitle={resVisible} title='请输入您的期望价格' logo={require('../public/img/circle-mobile-money.png')}>
      <div className='discount-container'>
        {
          !resVisible?(
            <div className='discount-page1'>
              <p className='car-model'>{carDetail.sellTitle}</p>
              <div className='car-info'>
                <div className='car-info-l'>
                  <span>所在城市：{carDetail.cityName}</span>|
                  <span>{carDetail.plateYear}年{carDetail.plateMonth}月上牌</span>|
                  <span>{carDetail.kilometres}万公里</span>
                </div>
                <div className='car-info-r'>
                  卖家报价：
                  <span>{carDetail.retailPrice}万</span>
                </div>
              </div>
              <Form layout="inline" onSubmit={handleSubmitForm}  className="discount-form">
                <Form.Item label='期望价格' className='input-box-item'>
                  {
                    getFieldDecorator('expectedPrice',{rules:[{required:true,message:'请输入期望价格'}]})(
                      <Input className='form-ipt' placeholder='请输入期望价格' size='large' suffix='万' />
                    )
                  }
                </Form.Item>
                <Form.Item label='手机号码' className='input-box-item'>
                  {
                    getFieldDecorator('mobile',{rules:[{required:true,message:'请输入您的手机号'},{validator:mobileValidator}],validateTrigger:'onBlur'})(
                      <Input className='form-ipt' placeholder='请输入您的手机号' maxLength={11} size='large' suffix=' ' />
                    )
                  }
                </Form.Item>
                <div className='submit-btn-box'>
                  <Button type="primary" size='large' htmlType="submit" className='submit-btn'>提交</Button>
                  <p>
                    免费咨询<span className='font-orange'>400-8119-870</span>
                    <br/>
                    <span style={{fontSize:'14px',color:'#8a8d96'}}>提交即视为同意</span>
                    <a style={{fontSize:'14px',color:'#ff7300'}} target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/statementWeb.html'>《个人信息保护声明》</a>
                  </p>
                  
                </div>
              </Form>
              
            </div>
          ):(
            <div className='discount-page2'>
              <img src={require('../public/img/icon-success.png')} />
              <p className='res-tit'>提交成功</p>
              <span>已收到您的申请，我们将会安排专员联系您！</span>
              <div className='code-box'>
                <img src={require('../public/img/wechatCode.png')} />
                <p>关注小胖车公众号，了解更多信息</p>
              </div>
            </div>
          )
        }
      </div>
    </Dialog>
  )
}
const DiscountDialog = Form.create()(DiscountForm)


const detailCar = (props) => {
  const {carData,recomList} = props
  const carDatad = carData.data || {}
  let imgList = []
  if (carDatad.carSellDetailInfoVO){
    imgList = carDatad.carSellDetailInfoVO.imgList
    imgList = imgList.filter((ele, index) => {
      return ele.attachmentType !=3
    })
    carDatad.carSellDetailInfoVO.imgList = imgList
  }

  const [carDetail] = useState(carDatad.carSellDetailInfoVO || { imgList:[],carModelItem :{}})
  const [carConfig] = useState(carDatad.carModelConfigItemGroupVOList || [])
  const [showMask,setShowMask] = useState(false)
  const [currentIndex, setCurrenIndex] = useState(0)
  const [viewIndex, setViewIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [financeVisible, setFinanceVisible] = useState(false)
  const [discountVisible, setDiscountVisible] = useState(false)
  const [moreConfig, setMoreConfig] = useState(false)
  // console.log(carDetail);
  function isShowMask(){
    setShowMask(!showMask)
  }
  function slideToImg(index){
    setCurrenIndex(index)
  }
  function viewToImg(index){
    setViewIndex(index)
  }

  function sliderFloor(index) {
    let parameter = document.getElementById("parameter");
    let _top = parameter.offsetTop
    let floors = document.querySelectorAll(".anchorFloor .floorItem");
    window.scrollTo(0, floors[index].offsetTop + _top)
  }
  const _getListCarDetail = async ()=>{
    let res = await getListCarDetail({ id: 2137 })
    // console.log(res);
  }
  function defaultFloor(){
    _getListCarDetail()
    if (moreConfig){
  
      //获取楼层
      let floors = document.querySelectorAll(".anchorFloor .floorItem");
      //获取楼层导航
      let imgMore = document.getElementById("imgMore");
      let _top = imgMore.offsetTop+60
      let anchorNav = document.getElementById("anchorNav");
      let an_height = anchorNav.offsetHeight
      let floorNavs = document.querySelectorAll(".anchorNav .navItem");
      // 车源图片 
      let posBotton = document.getElementById("posBotton");
      let _bottom = posBotton.offsetTop
      
      //获取滚动条高度，兼容ie
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log((scrollTop + an_height) >= _bottom);
      //符合点亮条件的楼层索引
      let activeIndex = 0;
      //楼层导航图标点亮控制
      if (scrollTop >= _top && (scrollTop + an_height) < _bottom) {
        anchorNav.classList.add('fixed-pos')
        anchorNav.classList.remove('absolute-pos')
      } else if (scrollTop < _top) {
        anchorNav.classList.remove('fixed-pos')
      } else if ((scrollTop + an_height) >= _bottom) {
        anchorNav.classList.add('absolute-pos')
        anchorNav.classList.remove('fixed-pos')
      }
      for(let i=0;i<floors.length;i++){
        floors[i].offsetTop + _top <= scrollTop ? activeIndex = i : null;
      }
      // floors.forEach((floor, index) => {
      //   //检查各楼层顶端距离视窗顶端距离，如果满足条件则修改楼层图标
      // });
      //根据索引数设置楼层样式
      for(let i = 0;i < floors.length; i++) {
        i === activeIndex ? floorNavs[i].classList.add('active') : floorNavs[i].classList.remove('active');
      }
      // floorNavs.forEach((nav, index) => {
      //   index === activeIndex ? nav.classList.add('active') : nav.classList.remove('active');
      // });
    }
    
  }

  useEffect(() => {
    carData.code !== 0 ?message.error(carData.message):'';
    defaultFloor()
    window.addEventListener('scroll', defaultFloor)
    return () => {
      window.removeEventListener('scroll', defaultFloor)
    }
    

  }, [moreConfig])
  
  return (
    <div id='car-detail-container'>
      <MetaHead type='cardetail' detailData={carDetail}></MetaHead>
      {/* 预约看车 */}
      <ReserveDialog hideDialog={()=>{setVisible(false)}} visible={visible} carDetail={carDetail} title='预约看车'></ReserveDialog>
      {/* 优惠分期 */}
      {
        carDetail.supportMortgage == 'Y'? (
          <FinanceDialog hideDialog={()=>{setFinanceVisible(false)}} visible={financeVisible} carDetail={carDetail}></FinanceDialog>
        ) : ''
      }
      {/* 我要优惠 */}
      <DiscountDialog hideDialog={()=>{setDiscountVisible(false)}} visible={discountVisible} carDetail={carDetail}></DiscountDialog>
      {/* 预览图片 */}
      <PreView currentIndex={viewIndex} showMask={showMask} sellTitle={carDetail.sellTitle} isShowMask={isShowMask} showMask={showMask} imgList={carDetail.imgList}></PreView>
      <div id="buyHead"><Header noFixed={true}></Header></div>
      <SiderNav></SiderNav>
      <div className="w1200">
        <div className="serviceOpen">
          <div className="productSlide">
            <Slide currentIndex={currentIndex} viewToImg={viewToImg} slideToImg={slideToImg} isShowMask={isShowMask} imgList={carDetail.imgList}></Slide>
          </div>
          <div className="textBox">
            <div className="sellTitle">{carDetail.sellTitle} {carDetail.supportMortgage == 'Y'?(<Tag color='orange'>分期金融</Tag>):''}</div>
            {/* 标签 */}
            <div className='cat-tabs'>
              
            </div>
            <div className="price">
              {
                carDetail.supportMortgage == 'Y'? (
                  <>
                    <span className="pricetype"><span>分期首付</span>￥{carDetail.downPayment?carDetail.downPayment.toFixed(2):''} <span>万</span> </span>
                    <span>总价{carDetail.retailPrice?carDetail.retailPrice.toFixed(2):''}万</span>
                  </>
                ):(
                  <>
                    <span className="pricetype">￥{carDetail.retailPrice?carDetail.retailPrice.toFixed(2):''} <span>万</span> </span>
                    <span className="newprice">新车含税价{carDetail.taxInclusivePrice}万(含税)</span>
                  </>
                )
              }
              
              
              {
                carDetail.isTest == 'Y'?(
                  <Popover content={(
                    <div className='report-code-box'>
                      <QRCode value={`${shareUrl}testreport?id=${carDetail.id}`} size={140}></QRCode>
                      <p>手机扫码关注，<br/>查看车辆检测报告</p>
                    </div>
                  )} placement='bottom'>
                    <div className="testReport">
                      <Icon type="file-search" style={{marginRight: '6px'}}/>
                      <span>查看车辆检测报告</span>
                    </div>
                  </Popover>
                ):''
              }
            </div>
            <div className="baseInfo">
              <div className="info">
                <div className="txt">{carDetail.plateYear}-{carDetail.plateMonth}</div>
                <div className="label">上牌时间</div>
              </div>
              <div className="info">
                <div className="txt">{carDetail.kilometres?carDetail.kilometres+'万公里':'-'}</div>
                <div className="label">表显里程</div>
              </div>
              <div className="info">
                <div className="txt">{carDetail.carModelItem.carEmissions}</div>
                <div className="label">排量</div>
              </div>
              <div className="info">
                <div className = "txt" > { gearboxTypeObj[carDetail.gearboxType] || '-' } </div>
                <div className="label">变速箱</div>
              </div>
            </div>
            
            <div className="banner">
              {
                carDetail.supportMortgage == 'Y' ? (
                  <img onClick={()=>{setFinanceVisible(true)}} src={require('../public/img/cardetail-fenqi.png')} alt=""/>
                ):''
              }
            </div>
            <div className="tooBtn">
              <div className="btnItem" onClick={()=>{setVisible(true)}}>预约看车</div>
              <div className="btnItem btnr" onClick={()=>{setDiscountVisible(true)}}>我要优惠</div>
            </div>
          </div>
        </div>
        <div className="baseInfo-tit">基本信息</div>
        <div className="baseInfo">
          <div className="info">
            <div className="txt">{carDetail.plateYear}-{carDetail.plateMonth}</div>
            <div className="label">上牌时间</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.carPlateSiteDesc || '-'}</div>
            <div className="label">上牌地</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.carColor || '-'}</div>
            <div className="label">车身颜色</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.standard || '-'}</div>
            <div className="label">排放标准</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.kilometres?carDetail.kilometres+'万公里':'-'}</div>
            <div className="label">表显里程</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.carModelItem.carEmissions || '-'}</div>
            <div className="label">排量</div>
          </div>
          <div className="info">
            <div className="txt">{gearboxTypeObj[carDetail.gearboxType] || '-'}</div>
            <div className="label">变速箱</div>
          </div>
          <div className="info">
            <div className="txt">{carDetail.transferTimes || '-'}</div>
            <div className="label">过户次数</div>
          </div>
          <div className="info">
            <div className = "txt" > { carDetail.annualReviewValidDate || '-' } </div>
            <div className="label">年检到期</div>
          </div>
          <div className="info info-btn" onClick={()=>{
            let scrollTop = document.documentElement || document.body;
            scrollTop.scrollTo({left:0,top:document.getElementById('parameter').offsetTop,behavior:'smooth'})
          }}>
            {/* <div className="txt">{carDetail.forcedInsuranceValidDate || '-'}</div>
            <div className="label">交强险</div> */}
            <span>更多参数</span>
            <Icon type="right-circle"  style={{marginLeft: '6px'}}  />
          </div>
        </div>
        {
          false?(
            <div className="serive">
              <div className="service-left">
                <img src='https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00473-1165.jpg' />
                <div className="service-left-main">
                  <p>顾问：张莉莉</p>
                  <div>
                    <Icon type="phone" style={{marginRight:'6px',transform:'rotateY(180deg)'}}/>
                    <span>咨询看车</span>
                  </div>
                </div>
              </div>
              <div className="service-right">
                <div className="baseInfo-tit" id="baseInfo-tit">车辆描述</div>
                <div style={{ paddingLeft: 20}}>{carDetail.carDesc}</div>
              </div>
            </div>
          ):(
            <div>
              <div className="baseInfo-tit" id="baseInfo-tit">车辆描述</div>
              <div style={{ paddingLeft: 20, paddingBottom: 30}}>{carDetail.carDesc}</div>
            </div>
          )
        }
        <div className="baseInfo-tit" id="carimgtit">车源图片</div>
        <div className="listImg">
          {
            carDetail.imgList.map((ele,index)=>(
              <div key={index} className="carImg" onClick={()=>{
                setViewIndex(index)
                isShowMask();
              }} style={{display:index<8?'block':'none'}}>
                <img src={shortImg(ele.filePath,'590')} alt={ele.attachmentTypeDesc}/>
                {
                  ele.position?(<div className="cartxt">{ele.position}</div>):''
                }
              </div>
            ))
          }
        </div>
        <div className="imgMore" id="imgMore" onClick={isShowMask}>查看更多<Icon type="right-circle"  style={{marginLeft: '6px'}}  /> </div>

      </div>
      <div className="config-parms">
        <div className={`parameter ${moreConfig?'active':''}`} id="parameter" style={{height:carConfig.length && !moreConfig?'532px':'auto'}}>
          <div className="anchorNav" id="anchorNav">
            <div className="baseInfo-tit">配置参数</div>
            {
              carConfig.map((ele,index)=>(
                <div onClick={()=>{sliderFloor(index)}} className={`navItem ${index==0?'active':''}`} key={index}>{ele.title}</div>
              ))
            }
          </div>
          <div className="anchorFloor">
            {
              carConfig.map((ele,index)=>(
                <div className="floorItem"  key={index}>
                  <div className="label">{ele.title}</div>
                  <div className="itemBox">
                    {
                      ele.carModelConfigItems.map((data,i)=>(
                        <div className="item" key={i}>
                          <span>{data.name}</span>
                          <span>{data.value}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
            <div  style={{display:!carConfig.length?'none':'block',fontSize: '12px',color: '#ccc',textAlign: 'center',marginTop: '10px'}}>以上参配信息仅供参考，实际参数配置以售卖车辆为准</div>
          </div>

        
        </div>
        <Empty description="暂无配置参数" style={{display:carConfig.length?'none':'block',margin:'100px auto'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <div className="moreConfigBox"><div className="moreConfigBtn" style={{display:moreConfig || !carConfig.length?'none':'block'}} onClick={()=>{setMoreConfig(!moreConfig)}}>查看所有参数 <Icon type="double-left" rotate={-90}/></div></div>
        <div id="posBotton" ></div>
      </div>
      {
        recomList.tlist.length?(
          <div className="guess-like">
            <div className='w1200'>
              <div className="baseInfo-tit" >猜你喜欢</div>
              <CarList currHotList={recomList.tlist}></CarList>
            </div>
          </div>
        ):''
      }
      <Foot></Foot>
    </div>
  )
}

detailCar.getInitialProps = async (props) => {
  let { id } = props.query
  const carData = await getListCarDetail({ id })
  let recomList = {data:{pageDataVO:{}}}
  if(carData.code == 0){
    recomList = await getListCars({pageIndex:1,pageSize:4,cityId:carData.data.carSellDetailInfoVO.cityId,catenaId:carData.data.carSellDetailInfoVO.catenaId,excludeCarIds:[id]});
  }

  return { carData, recomList: recomList.data.pageDataVO }
 
}

export default withRouter(detailCar);