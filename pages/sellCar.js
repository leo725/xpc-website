import React, {useEffect,useState} from 'react';
import '../public/style/pages/sellCar.scss'
import MetaHead from '../components/MetaHead'
import SiderNav from '../components/SiderNav'
import Header from '../components/Header'
import Foot from '../components/Foot'
import SellCarDialog from '../components/SellCarDialog'
import { message } from 'antd'
import { regPhone } from '../public/js/vx'


const sellCar = () => {
  const [mobile, setMobile] = useState('')
  const [visible, setVisible] = useState(false)
  const problemList = [
    {
      question:'在小胖车平台怎么卖车？',
      answer:'您可以在网页上方预留手机号或者拨打我们服务热线400-8119-870与客服直接联系，我们将于第一时间上门查验车辆并替您寻找买家，买家到场估价，当场交易，即刻打款。',
      answerList:[
        '您可以在网页上方预留手机号或者拨打我们热线400-8119-870 与一对一专属客服联系， 专属客服和您预约看车时间和小胖车门店地址。',
        '你和车到我们线下门店， 现场验车、 定价、 签约、 过户打款。',
      ]
    },
    {
      question:'小胖车上交易可靠吗？',
      answer:'购买方当场与你过户打款，中间交易环节完全透明。'
    },
    {
      question:'卖车需要准备的资料？',
      answer:'1、车辆登记证； 2、行驶证； 3、身份证； 4、购车发票/最近一次过户发票； 5、交强险单； 6、购置税发票； 7、购置税本； 8、检字标； 9、交强险标； 10、环保标。'
    },
    {
      question:'小胖车卖车怎么收费？',
      answer:'小胖车承诺在整个交易环节中不收取任何费用，您提交信息后我们会安排专属客服为你提供优质服务，全程服务免费。'
    }
  ]

  // 高价卖车
  function handleSellCar(){
    if(!regPhone(mobile)){
      return message.warning('请填写正确的手机号');
    }
    setVisible(true)
  }
  return (
    <div className='sell-car-container'>
      <MetaHead type="wysell"></MetaHead>
      <div className='sell-banner'>
        {/* 固定的头部导航 */}
        <Header boxId="fixedHead"></Header>
        <SiderNav></SiderNav>
        <div className='search'>
          <input value={mobile} onChange={(e)=>{setMobile(e.target.value.replace(/[^\d]/g, ''))}} placeholder='请输入手机号码，10万车主已提交' maxLength='11' />
          <div className='search-btn' onClick={handleSellCar}>高价卖车</div>
        </div>
      </div>
      <div className='sell-main'>
        <ul className='server-list'>
          <li>
            <div><img src={require('../public/img/sell-server-1.png')} /></div>
            <p>省心服务</p>
            <span>专属客服为您寻找买家</span>
          </li>
          <li>
            <div><img src={require('../public/img/sell-server-2.png')} /></div>
            <p>交易透明</p>
            <span>您与买方面对面交易</span>
          </li>
          <li>
            <div><img src={require('../public/img/sell-server-3.png')} /></div>
            <p>快速到款</p>
            <span>最快1小时内到款</span>
          </li>
        </ul>
        {/* 卖车流程 */}
        <p className='sell-common-title' style={{marginBottom:'40px'}}>卖车流程</p>

        <div  style = {{textAlign: 'center',fontSize: '20px',marginBottom:'30px'}}>
          <div>爱车卖高价，人到车到款到！</div>
          <div>一对一专属管家服务，享受极速卖车体验。</div>
        </div>

        <ul className='step-list'>
          <li>
            <div><img src={require('../public/img/sell-step-1.png')} /></div>
            <p><strong>提交信息</strong><br/> 官网或电话提交卖车需求</p>
          </li>
          <li>
            <div><img src={require('../public/img/sell-step-2.png')} /></div>
            <p><strong>人车到店</strong><br/>一对一服务，专业定价，即刻成交</p>
          </li>
          <li>
            <div><img src={require('../public/img/sell-step-3.png')} /></div>
            <p><strong>签约过户</strong><br/> 交接完成后最快1小时内到账</p>
          </li>
        </ul>
        {/* 常见问题 */}
        <p className='sell-common-title'>常见问题</p>
        <ul className='question-list'>
          {
            problemList.map((ele,index)=>(
              <li key={index}>
                <p className='question'>{ele.question}</p>
                {
                  ele.answerList?(
                    ele.answerList.map((item,idx)=>(
                      <div className='answer' key={idx}>{idx+1}、{item}</div>
                    ))
                  ):(
                    <div className='answer'>{ele.answer}</div>
                  )
                }
                
              </li>
            ))
          }
        </ul>
      </div>
      <SellCarDialog mobile={mobile} visible={visible}  hideDialog={()=>{setVisible(false)}} setMobile={(val)=>{setMobile(val)}} />
      <Foot></Foot>
    </div>
  )
}

export default sellCar;