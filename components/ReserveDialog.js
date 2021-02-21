import React , { useState, useEffect } from 'react';
import Dialog from '../components/Dialog'
import '../public/style/components/reserveDialog.scss'
import { saveCrmCustomer } from '../public/api'
import { message, Input, Button, Form } from 'antd'
import { regPhone } from '../public/js/vx'


const ReserveForm = (props)=>{
  const {visible,carDetail,title} = props;
  const {getFieldDecorator, resetFields} = props.form
  const [showResVisible,setShowResVisible] = useState(false)

  useEffect(()=>{
    if(visible){
      document.body.style.overflow ='hidden'
    }else{
      document.body.style.overflow ='auto'
    }
  },[visible])

  // 提交预约
  const handleSubmitForm = (e)=>{
    e.preventDefault();
    props.form.validateFields(async (err,values)=>{
      if(!err){
        const { mobile } = values;
        let params = {
          carModelName: carDetail.modelName,
          sellCarId:carDetail.id,
          source:'website_buy_car',
          mobile
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

  const beforeHideDialog = ()=>{
    resetFields()
    setShowResVisible(false)
    props.hideDialog()
  }

  // 自定义校验规则
  const mobileValidator = (rule,value,callback) =>{
    if(value && !regPhone(value)){
      callback('请输入正确的手机号');
    }else{
      callback()
    }
  }

  return (
    <Dialog hideDialog={beforeHideDialog} title={title} visible={visible} hideTitle={showResVisible} logo={require('../public/img/circle-icon-mobile.png')}>
      <div className='reserve-box'>
        {
          !showResVisible?(
            <div className='reserve-submit-box'>
              <p className='car-model'>{carDetail.sellTitle}</p>
              <Form layout="inline" onSubmit={handleSubmitForm}  className="reserve-form">
                <Form.Item label='手机号码' className='input-box-item'>
                  {
                    getFieldDecorator('mobile',{rules:[{required:true,message:'请输入手机号'},{validator:mobileValidator}],validateTrigger:'onBlur'})(
                      <Input className='mobile-input' autoComplete='off' maxLength={11} onInput={(e)=>{e.target.value = e.target.value.replace(/[^\d]/g, '')}} placeholder='请输入您的手机号' size='large' />
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
            <div className='reserve-res-box'>
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

const ReserveDialog = Form.create()(ReserveForm)

export default ReserveDialog;