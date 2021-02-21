import React, { useState, useEffect } from 'react';
import '../public/style/components/sellcardialog.scss'
import { message, Icon, Input, Button, Form, Select, Row,Col,Checkbox} from 'antd'
import { getAllCity, saveCarSell, getCarBrandList, getCarSeriesList } from '../public/api/index'
import { regPhone } from '../public/js/vx'
import $vx from '../public/js/vx'

const SellCarForm = (props)=>{
  const { Option } = Select;
  var {mobile,visible,sellId} = props
  const { getFieldDecorator, setFieldsValue, resetFields, getFieldsValue } = props.form;
  const [ showCityList, setShowCityList ] = useState(false);
  const [ showResDialog, setShowResDialog ] = useState(false);
  const [ cityList, setCityList ] = useState([]);
  const [carBrandList, setCarBrandList] = useState([])
  const [carSeriesList, setCarseriesList] = useState([])
  const [ selectCity, setSelectCity ] = useState({})
  const [ btnLoading, setBtnLoading ] = useState(false)
  const [ plan, setPlan ] = useState('')
  const [yearList, setYearList] = useState([]);
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const carStatusArr = [{ value: 0, label: '精品' }, { value: 1, label: '良好' }, { value: 2, label: '一般' }];
  const essentialList = ['车辆登记证', '行驶证', '身份证', '检字标', '交强险标', '环保标', '交强险单', '购置税本', '购置税发票', '购车发票/最近一次过户发票']
  const [carBrand, setCarBrand] = useState({});
  const [carSeries, setCarSeries] = useState({});
  const [showBrandVisible, setShowBrandVisible] = useState('hide')

  useEffect(()=>{
    let allCitys = $vx.sessionStorage.getItem('allCitys');
    if(allCitys){
      setCityList(allCitys.cityMap)
    }else{
      getAllCityFun();
    }
    initYearList()
    _getCarBrandList()
  },[])

  useEffect(()=>{
    if(visible){
      document.body.style.overflow = 'hidden'
      if(props.toSellData && props.toSellData.mobile){
        let { carBrand, carSeries, selectCity, mile, mobile, month, year } = props.toSellData
        setCarBrand(carBrand)
        props.form.setFieldsValue({ 'brandId': carBrand.id })
        setCarSeries(carSeries)
        props.form.setFieldsValue({ 'catenaId': carSeries.id })
        setSelectCity(selectCity)
        setFieldsValue({ carPlateSite: selectCity.cityName });
        _getCarSeriesList(carBrand.id,true)
        setFieldsValue({plateYear:year,plateMonth:parseInt(month),kilometres:mile})
      }
    }else{
      document.body.style.overflow = 'auto'
      resetFields();
    }

    
  },[visible])

  // 获取品牌
  const _getCarBrandList = async () => {
    let res = await getCarBrandList({});
    if (res.code == 0) {
      setCarBrandList(res.data)
    }
  }

  // 获取车系
  const _getCarSeriesList = async (brandId, notOpen) => {
    let res = await getCarSeriesList({ brandId })
    if (res.code == 0) {
      setCarseriesList(res.data)
      if(notOpen) return;
      setShowBrandVisible('series')
    }
  }

  const initYearList = (start, end) => {
    start = start || new Date().getFullYear() - 20
    end = end || new Date().getFullYear()
    let years = []
    for (let i = end; i >= start; i--) {
      years.push(i)
    }
    setYearList(years)
  }

  // 获取城市列表
  const getAllCityFun = async ()=>{
    let res = await getAllCity({});
    if(res.code==0){
      setCityList(res.data.cityMap);
    }
  }

  // 提交卖车数据
  const handleSubmitForm = (e)=>{
    e.preventDefault();
    props.form.validateFields( async (err,values)=>{
      if(!err){
        let params = Object.assign({source:'website'},values);
        // params.moreService = plan;
        params.mobile = mobile;
        params.id = sellId;
        params.brandName = carBrand.brandName;
        params.catenaName = carSeries.seriesName;
        // console.log(params);
        setBtnLoading(true)
        let res = await saveCarSell(params);
        setBtnLoading(false);
        if(res.code==0){
          setShowResDialog(true)
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

  // 关闭弹窗
  function handleClose(){
    setShowResDialog(false);
    setSelectCity({});
    setCarBrand({})
    setCarSeries({})
    setPlan('')
    props.setMobile('');
    props.hideDialog();
  }

  // 滚动到相应的key 
  function scrollToKey(key){
    let offsetTop = document.getElementById('key-'+key).offsetTop
    document.getElementById('city-list').scrollTop = offsetTop
  }

  // 选择城市
  const changeSelectCity = (city)=>{
    setShowCityList(false);
    setSelectCity(city);
    setFieldsValue({ carPlateSite: city.cityName });
  }

  //选择购车计划
  function checkPlan(value) {
    value == plan ? setPlan('') : setPlan(value)
  }

  // 选择品牌
  const selectCarBrand = (item) =>{
    setCarBrand(item)
    setCarSeries({})
    props.form.setFieldsValue({ 'catenaId': '' })
    props.form.setFieldsValue({ 'brandId': item.id })
    _getCarSeriesList(item.id)
  }
  // 选择车系
  const selectCarSeries = (item) =>{
    setCarSeries(item);
    props.form.setFieldsValue({ 'catenaId': item.id })
  }
  // 点击key 跳转到相应品牌
  const scrollToBrandsByKey = (key)=>{
    let offsetTop = document.getElementById('brands-'+key).offsetTop
    document.getElementById('brands').scrollTop = offsetTop;
  }

  // 隐藏弹出选项框
  const hideOptions = (isGuJia,isCity)=>{
    if(isGuJia){
      setShowBrandVisible('none');
    }
    if(isCity){
      setShowCityList(false)
    }
  }

  return (
    <div className='dialog sell-dialog' style={{display:visible?'block':'none'}}>
      {
        !showResDialog ? (
          <div className='dialog-main'>
            <i className='dialog-close' onClick={handleClose}><Icon type="close" /></i>
            <div className='dialog-header'>
              只需<span> 1 </span>步，搞定卖车，成交稳稳的
            </div>
            <div className='dialog-content'>
              <Form layout="inline" onSubmit={handleSubmitForm}  >
                <div className='form-item' onClick={()=>{hideOptions(false,true)}}>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={14}>
                      <Form.Item label='售卖车型' className='content-item'>
                        {
                          getFieldDecorator('brandId', { rules: [{ required: true, message: '请选择品牌' }] })(
                            <div className='self-select-box'>
                              <Input value={carBrand.brandName} readOnly={true} onClick={()=>{setShowBrandVisible('brands')}} placeholder='品牌' suffix={<Icon type="down"/>}/>
                              <div className='self-select brand-list' style={{display:showBrandVisible=='brands'?'block':'none'}} onMouseOver={()=>{setShowBrandVisible('brands')}}>
                                <div className='self-select-options brands' id='brands'>
                                  {
                                    carBrandList.map((item,index)=>(
                                      <div key={index} id={'brands-'+item.initials}>
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
                    <Col span={10}>
                      <Form.Item>
                        {
                          getFieldDecorator('catenaId', { rules: [{ required: true, message: '请选择车系' }] })(
                            <div className='self-select-box'>
                              <Input value={carSeries.seriesName} readOnly={true} disabled={!carBrand.id} onClick={()=>{setShowBrandVisible('series')}} placeholder={'车系'} suffix={<Icon type="down"/>}/>
                              <div className='self-select' style={{display:showBrandVisible=='series'?'block':'none'}} onMouseOver={()=>{setShowBrandVisible('series')}} onMouseOut={()=>{setShowBrandVisible('none')}}>
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
                  </Row>
                </div>
                
                {/* <div className='form-item' onClick={()=>{hideOptions(true,true)}}>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={14}>
                      <Form.Item label='上牌时间' className='content-item'>
                        {
                          getFieldDecorator('plateYear', { rules: [{ required: true, message: '请选择上牌年份' }] })(
                            <Select style={{width:'100%'}} placeholder='年份' getPopupContainer={triggerNode => triggerNode.parentElement}>
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
                    <Col span={10}>
                      <Form.Item>
                        {
                          getFieldDecorator('plateMonth', { rules: [{ required: true, message: '请选择上牌月份' }] })(
                            <Select style={{width:'100%'}} placeholder='月份' getPopupContainer={triggerNode => triggerNode.parentElement}>
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
                
                <div className='form-item' onClick={()=>{hideOptions(true,true)}}>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={24}>
                      <Form.Item label='行驶里程' className='content-item'>
                        {
                          getFieldDecorator('kilometres', { rules: [{ required: true, message: '请输入行驶里程' }] })(
                            <Input suffix="万公里" maxLength={5} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d.]/g, '')}} autoComplete='off' placeholder='请输入行驶里程' />
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                
                <Form.Item label='上牌地' className='content-item'  onClick={()=>{hideOptions(true,false)}}>
                  {
                    getFieldDecorator('carPlateSite', { rules: [{ required: true, message: '请选择上牌地' }] })(
                      <div className='city-box'>
                        <div className='city-select' onClick={()=>{setShowCityList(!showCityList)}}>
                          <span className={selectCity.cityName?'':'gray'}>{selectCity.cityName || '请选择车辆所在地'}</span>
                          <Icon type={showCityList?'up':'down'}/>
                        </div>
                        <div className='city-container' style={{display:showCityList?'flex':'none'}} onMouseOver={()=>{setShowCityList(true)}} onMouseOut={()=>{setShowCityList(false)}}>
                          <ul className='city-list' id='city-list'>
                            {
                              Object.keys(cityList).map((key,index)=>{
                                let citys = cityList[key];
                                return (
                                  <li key={key} id={'key-'+key}>
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
                </Form.Item> */}

                <div className='form-item'>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={24}>
                      <Form.Item label='姓名' className='content-item'>
                        {
                          getFieldDecorator('name', {})(
                            <Input placeholder='请输入请输入姓名' ></Input>
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div className='form-item'>
                  <Row className='form-item-r' gutter={10}>
                    <Col span={24}>
                      <Form.Item label='车况' className='content-item'>
                        {
                          getFieldDecorator('carConditionDesc', { rules: [{ required: true, message: '请输入车况' }] })(
                            // <Select style = { { width: '100%' } } placeholder = '请选择车况'
                            // getPopupContainer = { triggerNode => triggerNode.parentElement } >
                            //   {
                            //     carStatusArr.map((item, index) => (
                            //       <Option value={item.value} key={index}>{item.label}</Option>
                            //     ))
                            //   }
                            // </Select>
                            <Input.TextArea  autoSize={{ minRows: 3, maxRows: 6 }} placeholder='请输入请输入车况' ></Input.TextArea>
                          )
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                {/* <div className="otherPlan">
                  <div className="checked" onClick={()=>{checkPlan('change_car')}} style={{marginRight:120}}>
                    <img src = { plan == 'change_car' ? require('../public/img/checked.png') : require('../public/img/check.png') } alt = "" / >
                    <span>我想置换车辆</span>
                  </div>
                  <div  className="checked" onClick={()=>{checkPlan('no_purchase')}}>
                    <img src = { plan == 'no_purchase' ? require('../public/img/checked.png') : require('../public/img/check.png') }  alt=""/>
                    <span>暂无购车计划</span>
                  </div>
                </div> */}
                <Button loading={btnLoading} htmlType="submit" className='submit-btn'>提交</Button>
                <div style={{textAlign:'center',marginTop:'20px'}}>
                  <span style={{fontSize:'14px',color:'#8a8d96'}}>提交即视为同意</span>
                  <a style={{fontSize:'14px',color:'#ff7300'}} target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/statementWeb.html'>《个人信息保护声明》</a>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <div className='dialog-main dialog-res'>
            <i className='dialog-close' onClick={handleClose}><Icon type="close" /></i>
            <div className='res-top'>
              <div className='dialog-header'>
                <Icon type="check-circle" theme="filled" className='icon-check' /> 提交成功
              </div>
              <div className='res-item'>
                <label>手机号码</label>
                <span>{mobile}</span>
              </div>
              {/* <div className='res-item'>
                <label>车辆所在地</label>
                <span>{selectCity.cityName}</span>
              </div> */}
            </div>
            <div className='res-bottom'>
              <p className='title'>车辆交易必备</p>
              <div className='res-flex'>
                <ul>
                  {
                    essentialList.map((ele,index)=>(
                      <li key={index}>
                        <Icon type="check-circle" theme="filled" className='icon-check-small' />
                        <span>{ele}</span>
                      </li>
                    ))
                  }
                </ul>
                <div className='code-box'>
                  <img src={require('../public/img/wechatCode.png')} />
                  <p>关注公众号了解更多信息</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

const SellCarDialog = Form.create({ brandId: {}, catenaId: {},  mobile: '' })(SellCarForm)

export default SellCarDialog;