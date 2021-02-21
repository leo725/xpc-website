import React, { useState, useEffect } from 'react';
import '../public/style/components/AssessCar.scss'
import { message, Icon, Input, Button, Select, Form, Row, Col, Tooltip  } from 'antd'
import { getProvinceList, getCityList, getCarBrandList, getCarSeriesList, getCarModelList, evalCar, getAllCity } from '../public/api'
import { regPhone } from '../public/js/vx'
import $vx from '../public/js/vx'

const AssessCarForm = (props)=>{
  const {visible,mobile} = props;
  const { Option } = Select;
  const {getFieldDecorator,setFieldsValue} = props.form;
  const [carBrand,setCarBrand] = useState({});
  const [carSeries,setCarSeries] = useState({});
  const [carModel,setCarModel] = useState({});
  const [province,setProvince] = useState('')


  const [yearList,setYearList] = useState([]);
  const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
  const [cityList,setCityList] = useState([]);
  const [carBrandList,setCarBrandList] = useState([])
  const [carSeriesList,setCarseriesList] = useState([])
  const [carModelList,setCarModelList] = useState([])
  const [showBrandVisible,setShowBrandVisible] = useState('hide')
  const [showRes,setShowRes] = useState(false)
  const [sellCarMobile,setSellCarMobile] = useState('')
  const [evalResData,setEvalResData] = useState({carModelEvalVO:{},city:{},regDate:'',usedCarEvalPriceVO:{eval_prices:[]}})
  const [submitData,setSubmitData] = useState({})

  const [ selectCity, setSelectCity ] = useState({})
  const [ showCityList, setShowCityList ] = useState(false);

  const resTxt = {
    NORMAL:{
      title:'车况一般',
      img:require('../public/img/eval-res-0.png'),
      introduct: '外观有轻微色差，有少量瑕疵；内饰内饰有少量部件存在磨损，个别严重破损，通风后不存在明显异味；动力系统正常且无维修；机械部位运行存在异常，有部分维修或更换记录'
    },
    GOOD:{
      title:'车况良好',
      img:require('../public/img/eval-res-1.png'),
      introduct: '外观无色差，有个别瑕疵；内饰有个别部件存在轻微磨损，无破损，无异味；20万公里以内；动力系统运行正常且无维修，机械部位运行正常，有部分维修或更换记录，电子设备及模块使用正常'
    },
    EXCELLENT:{
      title:'车况优秀',
      img:require('../public/img/eval-res-2.png'),
      introduct: '外观无可见瑕疵和色差；内饰干净整洁无明显可见磨损，无异味；2年且4万公里以内，动力系统、机械部位运行正常且无维修， 按时保养且记录完整；电子系统无任何故障'
    }
  }
  

  useEffect(()=>{
    let allCitys = $vx.sessionStorage.getItem('allCitys');
    if(allCitys){
      setCityList(allCitys.cityMap)
    }else{
      getAllCityFun();
    }
    _getCarBrandList()
  },[])

  useEffect(()=>{
    if(visible){
      setCarBrand({})
      setCarSeries({})
      setCarModel({})
      setShowRes(false)
      props.form.resetFields();
      document.body.style.overflow = 'hidden'
      setSelectCity({})
      setFieldsValue({'mobile':mobile})
    }else{
      document.body.style.overflow = 'auto'
    }
  },[visible])

  // 获取城市
  const _getCityList = async(provinceId) => {
    let res = await getCityList({provinceId});
    if(res.code==0){
      setCityList(res.data)
    }
  }

  // 获取城市列表
  const getAllCityFun = async ()=>{
    let res = await getAllCity({});
    if(res.code==0){
      setCityList(res.data.cityMap);
    }
  }
  // 省份改变
  const onProvinceChange = (val)=>{
    setProvince(val)
    _getCityList(val)
    props.form.setFieldsValue({'cityCode':undefined})
  }

  // 获取品牌
  const _getCarBrandList = async()=>{
    let res = await getCarBrandList({});
    if(res.code==0){
      setCarBrandList(res.data)
    }
  }

  // 鼠标移出，隐藏/显示其他
  const mouseOutFun = (key = 'hide')=>{
    
  }

  // 获取车系
  const _getCarSeriesList = async(brandId)=>{
    let res = await getCarSeriesList({brandId})
    if(res.code==0){
      setCarseriesList(res.data)
      setShowBrandVisible('series');
    }
  }

  // 获取车型
  const _getCarModelList = async(seriesId)=>{
    let res = await getCarModelList({seriesId});
    if(res.code==0){
      setCarModelList(res.data);
      setShowBrandVisible('model')
    }
  }
  
  // 选择品牌
  const selectCarBrand = (item) =>{
    setCarBrand(item)
    setCarSeries({})
    setCarModel({})
    props.form.setFieldsValue({'carModel':''})
    props.form.setFieldsValue({'carSeries':''})
    props.form.setFieldsValue({'carBrand':item.id})
    _getCarSeriesList(item.id)
  }
  // 选择车系
  const selectCarSeries = (item) =>{
    setCarSeries(item);
    setCarModel({})
    props.form.setFieldsValue({'carModel':''})
    props.form.setFieldsValue({'carSeries':item.id})
    _getCarModelList(item.id)
  }
  // 选择车型
  const selectCarModel = (item,itemFather) =>{
    setCarModel(item);
    props.form.setFieldsValue({'carModel':item.id,'year': undefined})
    if(!item.minRegYear){
      item.minRegYear = itemFather.productiveYear
    }
    initYearList(item.minRegYear,item.maxRegYear);
    setShowBrandVisible('hide')
  }
  // 点击key 跳转到相应品牌
  const scrollToBrandsByKey = (key)=>{
    let offsetTop = document.getElementById('assess-brands-'+key).offsetTop
    document.getElementById('assess-brands').scrollTop = offsetTop;
  }

  // 根据车型获取可选年份
  const initYearList = (start,end)=>{
    start = start || new Date().getFullYear() - 20
    end = end || new Date().getFullYear()
    let years = []
    for (let i = end; i >= start; i--) {
      years.push(i)
    }
    setYearList(years)
  }

  // 选择城市
  const changeSelectCity = (city)=>{
    setShowCityList(false);
    setSelectCity(city);
    setFieldsValue({ cityCode: city.cityCode });
  }

  // 滚动到相应的key 
  function scrollToKey(key){
    let offsetTop = document.getElementById('key2-'+key).offsetTop
    document.getElementById('city-list2').scrollTop = offsetTop
  }

  // 关闭弹窗
  function handleClose(){
    setShowRes(false)
    props.hideDialog();
  }

  // 隐藏弹出选项框
  const hideOptions = (isGuJia,isCity)=>{
    if(isGuJia){
      setShowBrandVisible('hide');
    }
    if(isCity){
      setShowCityList(false)
    }
  }

  // 提交表单
  const handleSubmitForm = (e)=>{
    e.preventDefault();
    props.form.validateFields(async (err,values)=>{
      if(!err){
        let {cityCode,carModel,mile,year,month,mobile} = values;
        month = month >= 10? month : '0'+month
        let params ={
          carModelId:carModel,
          regDate: year+'-'+month + '-01',
          source:'website',
          cityCode,
          mile,
          mobile
        }
        setSubmitData({
          year,month,selectCity,mile,mobile,carBrand,carSeries
        })
        let res = await evalCar(params);
        if(res.code==0){
          setSellCarMobile(mobile)
          setEvalResData(res.data);
          setShowRes(true);
        }else{
          message.error(res.message)
        }
      }
    })
  }

  // 自定义校验规则
  const mobileValidator = (rule,value,callback) =>{
    if(value && !regPhone(value)){
      callback('请输入正确的手机号');
    }else{
      callback();
    }
  }

  return (
    <div id="assess-dialog" className='dialog assess-dialog' style={{display:visible?'block':'none'}}>
      {
        !showRes?(
          // 评估提交
          <div className='dialog-main'>
            <i className='dialog-close' onClick={handleClose}><Icon type="close" /></i>
            <div className='dialog-header'>爱车估价，卖车心里倍儿有底</div>
            <div className='dialog-content'>
              <Form layout="inline" onSubmit={handleSubmitForm} className="assess-form">
                <div className='form-item' onClick={()=>{hideOptions(false,true)}}>
                  <label className='form-label'>估价车型</label>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={6}>
                      <Form.Item>
                        {
                          getFieldDecorator('carBrand',{rules:[{required:true,message:'请选择品牌'}]})(
                            <div className='self-select-box'>
                              <Input value={carBrand.brandName} readOnly={true} onClick={()=>{setShowBrandVisible(showBrandVisible =='brands'?'none':'brands')}} placeholder='品牌' suffix={<Icon type="down"/>}/>
                              <div className='self-select brand-list' style={{display:showBrandVisible=='brands'?'block':'none'}} onMouseOver={()=>{setShowBrandVisible('brands')}}>
                                <div className='self-select-options brands' id='assess-brands'>
                                  {
                                    carBrandList.map((item,index)=>(
                                      <div key={index} id={'assess-brands-'+item.initials}>
                                        <p>{item.initials}</p>
                                        <ul>
                                          {
                                            item.carBrands.map((ele,idx)=>(
                                              <li key={ele.id} onClick={selectCarBrand.bind(this,ele)}>{ele.brandName}</li>
                                            ))
                                          }
                                        </ul>
                                      </div>
                                    ))
                                  }
                                </div>
                                <div className='keys'>
                                  {
                                    carBrandList.map((item,index)=>(
                                      <span onClick={scrollToBrandsByKey.bind(this,item.initials)} key={index}>{item.initials}</span>
                                    ))
                                  }
                                </div>
                              </div>
                              
                            </div>
                          )
                        }
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        {
                          getFieldDecorator('carSeries',{rules:[{required:true,message:'请选择车系'}]})(
                            <div className='self-select-box'>
                              <Input value={carSeries.seriesName} readOnly={true} disabled={!carBrand.id} onClick={()=>{setShowBrandVisible(showBrandVisible =='series'?'none':'series')}} placeholder={'车系'} suffix={<Icon type="down"/>}/>
                              <div className='self-select' style={{display:showBrandVisible=='series'?'block':'none'}} onMouseOver={()=>{setShowBrandVisible('series')}}>
                                <div className='self-select-options series' id='series'>
                                  {
                                  carSeriesList.map((item,index)=>(
                                    <div key={index}>
                                      <p>{item.carManufacturer}</p>
                                      <ul>
                                        {
                                          item.carSeriesItems.map((ele,idx)=>(
                                            <li key={ele.id} onClick={selectCarSeries.bind(this,ele)}>{ele.seriesName}</li>
                                          ))
                                        }
                                      </ul>
                                    </div>
                                  ))
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        {
                          getFieldDecorator('carModel',{rules:[{required:true,message:'请选择车型'}]})(
                            <div className='self-select-box'>
                              <Input value={carModel.carModelName} readOnly={true} disabled={!carSeries.id} onClick={()=>{setShowBrandVisible('model')}} placeholder='车型' suffix={<Icon type="down"/>}/>
                              <div className='self-select' style={{display:showBrandVisible=='model'?'block':'none'}} onMouseOver={()=>{setShowBrandVisible('model')}} onMouseOut={()=>{setShowBrandVisible('none')}}>
                                <div className='self-select-options model'>
                                  {
                                  carModelList.map((item,index)=>(
                                    <div key={index}>
                                      <p>{item.productiveYear}</p>
                                      <ul>
                                        {
                                          item.carModelItems.map((ele,idx)=>(
                                            <li key={ele.id} onClick={selectCarModel.bind(this,ele,item)}><Tooltip placement='left' title={ele.carModelName}>{ele.carModelName}</Tooltip></li>
                                          ))
                                        }
                                      </ul>
                                    </div>
                                  ))
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div className='form-item' onClick={()=>{hideOptions(true,true)}}>
                  <label className='form-label'>上牌时间</label>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={12}>
                      <Form.Item>
                        {
                          getFieldDecorator('year',{rules:[{required:true,message:'请选择上牌年份'}]})(
                            <Select disabled={!carModel.id} placeholder='年份' getPopupContainer={triggerNode => triggerNode.parentElement}>
                              {
                                yearList.map((item,index)=>(
                                  <Option value={item} key={item}>{item}年</Option>
                                ))
                              }
                            </Select>
                          )
                        }
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        {
                          getFieldDecorator('month',{rules:[{required:true,message:'请选择上牌月份'}]})(
                            <Select disabled={!carModel.id} placeholder='月份' getPopupContainer={triggerNode => triggerNode.parentElement}>
                              {
                                monthList.map((item,index)=>(
                                  <Option value={item} key={item}>{item}月</Option>
                                ))
                              }
                            </Select>
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div className='form-item' onClick={()=>{hideOptions(true,false)}}>
                  <label className='form-label'>卖车城市</label>
                  <Row className='form-item-r' gutter={10}>
                  <Form.Item className='content-item'>
                  {
                    getFieldDecorator('cityCode', { rules: [{ required: true, message: '请选择卖车城市' }] })(
                      <div className='city-box'>
                        <div className='city-select' onClick={()=>{setShowCityList(!showCityList)}}>
                          <span className={selectCity.cityName?'':'gray'}>{selectCity.cityName || '请选择卖车城市'}</span>
                          <Icon type={showCityList?'up':'down'}/>
                        </div>
                        <div className='city-container' style={{display:showCityList?'flex':'none'}} onMouseOver={()=>{setShowCityList(true)}} onMouseOut={()=>{setShowCityList(false)}}>
                          <ul className='city-list' id='city-list2'>
                            {
                              Object.keys(cityList).map((key,index)=>{
                                let citys = cityList[key];
                                return (
                                  <li key={key} id={'key2-'+key}>
                                    <i className='key'>{key}</i>
                                    <div className='city-item'>
                                      {
                                        citys.map((ele,idx)=>(
                                          <span key={ele.cityCode+idx} onClick={changeSelectCity.bind(this,ele)}>{ele.cityName}</span>
                                        ))
                                      }
                                    </div>
                                  </li>
                                )
                              })
                            }
                          </ul>
                          <ul className='index-list'>
                            {
                              Object.keys(cityList).map((key,index)=>(
                                <li key={'index-list'+key} onClick={scrollToKey.bind(this,key)}>
                                  <span>{key}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    )
                  }
                </Form.Item>
                  </Row>
                </div>
                <div className='form-item' onClick={()=>{hideOptions(true,true)}}>
                  <label className='form-label'>行驶里程</label>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={24}>
                      <Form.Item>
                        {
                          getFieldDecorator('mile',{rules:[{required:true,message:'请输入行驶里程'}]})(
                            <Input suffix="万公里" maxLength={5} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d.]/g, '')}} autoComplete='off' placeholder='请输入行驶里程' />
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div className='form-item' onClick={()=>{hideOptions(true,true)}}>
                  <label className='form-label'>手机号</label>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={24}>
                      <Form.Item>
                        {
                          getFieldDecorator('mobile',{rules:[{required:true,message:'请输入手机号'},{validator:mobileValidator}],validateTrigger:'onBlur'})(
                            <Input maxLength={11} autoComplete='off' onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d]/g, '')}} placeholder='请输入手机号' />
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Button type="primary" size='large' htmlType="submit" className='submit-btn'>开始评估</Button>
              </Form>
            </div>
            <div className='info-txt'>
              免费咨询 <span>400-8119-870</span>
            </div>
          </div>
        ):(
          // 评估结果
          <div className='dialog-main res-dialog-main'>
            <i className='dialog-close' onClick={handleClose}><Icon type="close" /></i>
            <div className='dialog-header'>您的爱车当前估值价</div>
            <div className='dialog-content res-main'>
              <div className='res-header'>
                <p>{evalResData.carModelEvalVO.carModelName}</p>
                <div className='res-header-info'>
                  <span>所在城市：{evalResData.city.cityName}</span>
                  <span>{evalResData.regDate.substring(0,7)}上牌</span>
                  <span>{evalResData.mile}万公里</span>
                </div>
              </div>
              <ul className='res-list'>
                {
                  evalResData.usedCarEvalPriceVO.eval_prices.map((ele,index)=>(
                    <li key={index}>
                      <div className='res-list-header'>
                        <img src={resTxt[ele.condition].img} />
                        <span>{resTxt[ele.condition].title}</span>
                      </div>
                      <div className='res-list-main'>
                        <span>估价范围（万元）</span>
                        <p className='price'>
                          <i>￥</i>
                          {ele.dealer_low_buy_price} ~ {ele.dealer_buy_price}
                        </p>
                        <div className='res-list-txt'>{resTxt[ele.condition].introduct}</div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <p className='other-info'>* 估价仅供参考，最终价格以实际检测竞拍后的报价为准。</p>
              <div className='sell-car-box'>
                <Input value={sellCarMobile} onChange={(e)=>{setSellCarMobile(e.target.value);}} maxLength={11} size='large' placeholder='请输入您的手机号' />
                <Button size='large' onClick={()=>{props.submitData(submitData);handleClose();props.toSellCar(sellCarMobile)}}>我要卖车</Button>
              </div>
            </div>
            <div className='info-txt'>
              免费咨询 <span>400-8119-870</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

const AssessCar = Form.create({carBrand:{},carSeries:{},carModel:{},year:'',month:'',province:'',cityCode:'',mile:'',mobile:''})(AssessCarForm)

export default AssessCar