import React , { useState, useEffect } from 'react';
import '../public/style/components/financeDialog.scss'
import { message, Input, Button, Form, Icon, Tabs } from 'antd'
import { saveCrmCustomer } from '../public/api'
import { regPhone } from '../public/js/vx'

const { TabPane } = Tabs;

const FinanceDialogForm = (props)=> {

  const {visible,carDetail,title} = props;
  const {getFieldDecorator, resetFields} = props.form;
  const [selectFenqi, setSelectFenqi] = useState();
  const [carShowFinanceProductVO, setCarShowFinanceProductVO] = useState({});
  const [showResVisible,setShowResVisible] = useState(false);
  const fenqiList = [12,24,36]
  useEffect(()=>{
    let { financialKfqVOS, websiteCarLeaseVOMap } = carDetail.carShowFinanceProductVO||{}
    setCarShowFinanceProductVO({ financialKfqVOS: financialKfqVOS||[], websiteCarLeaseVOMap: websiteCarLeaseVOMap||{} })
    if(visible){
      document.body.style.overflow ='hidden'
    }else{
      document.body.style.overflow ='auto'
    }
  },[visible])

  const beforeHideDialog = ()=>{
    resetFields()
    setSelectFenqi('')
    setShowResVisible(false);
    props.hideDialog()
  }

  // 自定义校验规则
  const mobileValidator2 = (rule,value,callback) =>{
    if(value && !regPhone(value)){
      callback('请输入正确的手机号');
    }else{
      callback()
    }
  }

  // 提交优惠分期
  const handleSubmitForm = (e)=>{

    e.preventDefault();
    props.form.validateFields(async (err,values)=>{
      if(!err){
        let {  financeMobile } = values;
        if (!selectFenqi) return message.warning('请选择优惠分期期数')
        let params = {
          carModelName: carDetail.modelName,
          sellCarId:carDetail.id,
          source:'website_instalments_buy_car',
          mobile: financeMobile,
          // name: financeName,
          stages: selectFenqi
        }
        let res = await saveCrmCustomer(params);
        if(res.code==0){
          setShowResVisible(true);
        }else{
          message.error(res.message)
        }
      }
    })
  }

  // 选择金融类型
  const callback = (key)=> {
    // console.log(key);
  }

  return (
    <div className="dialogs"  style={{display:visible?'block':'none'}}>
      <div className="dialog-main finance-dialog">
        <div className="dialog-close" onClick={beforeHideDialog}><Icon type="close" /></div>
        {
          !showResVisible ? (
            <>
              <img src={require('../public/img/cardetail-fenqi-dialog.png')} />
              { /* 老新优惠分期 */ }
              <div className="dialog-body" style={{display:!carDetail.carShowFinanceProductVO?'block':'none'}}>
                <p className='finance-title'>{carDetail.sellTitle}</p>
                <div className='finance-price'>
                  <span className='price'>￥{carDetail.downPayment?carDetail.downPayment.toFixed(2):''}万</span>
                  <span className='price-zdj'>新车指导价{carDetail.guideSalePrice}万</span>
                </div>
                <ul className='fenqi-list'>
                  {
                    fenqiList.map((item, index) => (
                      <li key={index} onClick={()=>{ setSelectFenqi(item) }} style={{display: 'flex',alignItems: 'center'}} className={selectFenqi == item ? 'active': ''}>
                        <Icon type="check-circle" theme="filled" />
                        <i className='circle'></i>
                        <span >{item}期</span>
                      </li>
                    ))
                  }
                </ul>
                <Form layout="inline" onSubmit={handleSubmitForm} name='financeForm' className="reserve-form">
                  {/* <Form.Item label='姓名' className='input-box-item'>
                    {
                      getFieldDecorator('financeName', { rules: [{ required: true, message: '请填写本人姓名' }]})(
                        <Input autoComplete='off' maxLength={8} placeholder='请填写本人姓名' size='large'/>
                      )
                    }
                  </Form.Item> */}
                  <Form.Item label='手机号' labelAlign="left" className='input-box-item'>
                    {
                      getFieldDecorator('financeMobile',{rules:[{required:true,message:'请输入手机号'},{validator:mobileValidator2}],validateTrigger:'onBlur'})(
                        <Input className='mobile-input' autoComplete='off' maxLength={11} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d]/g, '')}} placeholder='请输入您的手机号' size='large' />
                      )
                    }
                  </Form.Item>
                  <div className='submit-btn-box' style={{textAlign:'center'}}>
                    <Button type="primary" size='large' htmlType="submit" className='submit-btn'>提交申请</Button>
                    <br/>
                    <span style={{fontSize:'14px',color:'#8a8d96'}}>提交即视为同意</span>
                    <a style={{fontSize:'14px',color:'#ff7300'}} target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/statementWeb.html'>《个人信息保护声明》</a>
                    <br/>
                    <span style = { { fontSize: '14px', color: '#8a8d96' } } > 具体分期方案需要根据您的资质进行评估 </span>
                  </div>
                </Form>
              </div>
              {/* 新优惠分期 */}
              <div className="finTab"  style={{display:carDetail.carShowFinanceProductVO?'block':'none'}}>
                <Tabs defaultActiveKey = "1" size = "large"  onChange = { callback } >
                  {
                    Object.keys(carShowFinanceProductVO).map((item,index)=>{
                      return Object.keys(carShowFinanceProductVO[item]).length ? (
                        <TabPane  tab = { item == 'financialKfqVOS' ? '按揭分期' : '融资租赁' } key = { index } >
                          {/* 按揭 */}
                          <div  className = "dialog-body" style = { { display: item == 'financialKfqVOS' ? 'block' : 'none' } } >
                            <p className='finance-title'>{carDetail.sellTitle}</p>
                            <div className='finance-price'>
                              <span className='price'>￥{carDetail.downPayment?carDetail.downPayment.toFixed(2):''}万</span>
                              <span className='price-zdj'>新车指导价{carDetail.guideSalePrice}万</span>
                            </div>
                            <ul className='fenqi-list'>
                              {
                                carShowFinanceProductVO.financialKfqVOS.map((item, index) => (
                                  <li key={item.id} onClick={()=>{ setSelectFenqi('卡分期'+' '+item.productDeadline) }} className={selectFenqi == '卡分期'+' '+item.productDeadline ? 'active': ''}>
                                    {/* <Icon type="check-circle" theme="filled" />
                                    <i className='circle'></i> */}
                                    <span className="qi">{item.productDeadline}期</span>
                                    <span className="yuegong">月供{item.monthlyPayments}元</span>
                                    <div className="sf">分期首付款 ¥{parseFloat(item.downPayment/10000).toFixed(2)}万</div>
                                  </li>
                                ))
                              }
                            </ul>
                            <Form layout="inline" onSubmit={handleSubmitForm} name='financeForm' className="reserve-form">
                              {/* <Form.Item label='姓名' className='input-box-item'>
                                {
                                  getFieldDecorator('financeName', { rules: [{ required: true, message: '请填写本人姓名' }]})(
                                    <Input autoComplete='off' maxLength={8} placeholder='请填写本人姓名' size='large'/>
                                  )
                                }
                              </Form.Item> */}
                              <Form.Item label='手机号' labelAlign="left" className='input-box-item'>
                                {
                                  getFieldDecorator('financeMobile',{rules:[{required:true,message:'请输入手机号'},{validator:mobileValidator2}],validateTrigger:'onBlur'})(
                                    <Input className='mobile-input' autoComplete='off' maxLength={11} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d]/g, '')}} placeholder='请输入您的手机号' size='large' />
                                  )
                                }
                              </Form.Item>
                              <div className='submit-btn-box' style={{textAlign:'center'}}>
                                <Button type="primary" size='large' htmlType="submit" className='submit-btn'>提交申请</Button>
                                <br/>
                                <span style={{fontSize:'14px',color:'#8a8d96'}}>提交即视为同意</span>
                                <a style={{fontSize:'14px',color:'#ff7300'}} target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/statementWeb.html'>《个人信息保护声明》</a>
                                <br/>
                                <span style = { { fontSize: '14px', color: '#8a8d96' } } > 具体分期方案需要根据您的资质进行评估 </span>
                              </div>
                            </Form>
                          </div>
                          {/* 融资租赁 */}
                          <div  className = "dialog-body" style = { { display: item !== 'financialKfqVOS' ? 'block' : 'none' } } >
                            <p className='finance-title'>{carDetail.sellTitle}</p>
                            <div className='finance-price'>
                              <span className='price'>￥{carDetail.downPayment?carDetail.downPayment.toFixed(2):''}万</span>
                              <span className='price-zdj'>新车指导价{carDetail.guideSalePrice}万</span>
                            </div>
                            {
                              Object.keys(carShowFinanceProductVO.websiteCarLeaseVOMap).map((name, index) => (
                                <div className = "zhuLing" key={index}>
                                  <div className = "cpName" > {name}： </div> 
                                  {
                                    carShowFinanceProductVO.websiteCarLeaseVOMap[name].map((item, i) => (
                                      <div key = { i } >
                                        <div className = "cpItem" >
                                          <div>
                                            <span className="qi">{item.productDeadline}期</span>
                                            <span className="yuegong">月供{item.monthly.toFixed(0)}元</span>
                                            <div className="sf">分期首付款 <span>¥{parseFloat(item.downPayment/10000).toFixed(2)}万</span></div>
                                          </div>
                                          <div className="shBtn" onClick={()=>{ setSelectFenqi('融资租赁'+' '+name+' '+item.productDeadline) }}>审核条件</div>
                                        </div>
                                        <div  className = "info" style = {{display: selectFenqi == '融资租赁'+' '+name+' '+item.productDeadline ? 'block' : 'none' }} >
                                          <div className="tit">
                                            <img src={require('../public/img/jrzrbz.png')}/>
                                            <span>准入标准</span>
                                          </div>
                                          <div className="txt">{item.customerAccessStandard}</div>
                                          <div className="divider"></div>
                                          <div className="tit">
                                            <img src={require('../public/img/jrzrzl.png')}/>
                                            <span>资料要求</span>
                                          </div>
                                          <div className="txt">{item.businessOperationStandard}</div>
                                          <Form layout="inline"  onSubmit={handleSubmitForm} name='financeForm' className="reserve-form">
                                            <Form.Item label='' labelAlign="left" className='input-box-item'>
                                              {
                                                getFieldDecorator('financeMobile',{rules:[{required:true,message:'请输入手机号'},{validator:mobileValidator2}],validateTrigger:'onBlur'})(
                                                  <Input className='mobile-input' suffix={
                                                    <Button type="primary" size='large' htmlType="submit" style={{margin:0,marginRight:'-11px'}} className='submit-btn'>提交申请</Button>
                                                  } autoComplete='off' maxLength={11} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d]/g, '')}} placeholder='请输入您的手机号' size='large' />
                                                )
                                              }
                                            </Form.Item>
                                            <div className='submit-btn-box' >
                                              <span style={{fontSize:'14px',color:'#8a8d96'}}>提交即视为同意</span>
                                              <a style={{fontSize:'14px',color:'#ff7300'}} target="_black" href='http://share.xiaopangche.cn/html/webSiteagreement/statementWeb.html'>《个人信息保护声明》</a>
                                            </div>
                                          </Form>
                                        </div>
                                      </div>
                                    ))
                                  }
                                
                                </div>
                              ))
                            }
                          </div>
                        </TabPane>
                      ):''
                    })
                  }
                  {/* <TabPane  tab = "按揭分期" key = "1">
                    
                  </TabPane> */}
                  {/* <TabPane  tab = "融资租赁" key = "2" >
                    
                  </TabPane> */}
                </Tabs>
              </div>
              
            </>
          ):(
            <div className='reserve-res-box2'>
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
    </div>
  )
}

const FinanceDialog = Form.create({financeName:'',financeMobile:''})(FinanceDialogForm)

export default FinanceDialog;