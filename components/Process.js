import React,{useState} from 'react'
import '../public/style/components/process.scss'
import { CSSTransition } from 'react-transition-group'
const Process = ()=>{
  const [currProcesse, setCurrProcesse] = useState(0)
  return (
    <div className="process" >
        <div className="w1200" style={{height:'100%'}}>
          <div className="step-tab w1200">
           <div className="tit">交易流程</div>
           <div style={{lineHeight:'30px',marginTop: '10px'}}>
              <span onMouseOver={()=>{setCurrProcesse(0)}} className={currProcesse===0?'active':''}>买车流程</span>
              <em>|</em>
              <span onMouseOver={()=>{setCurrProcesse(1)}} className={currProcesse===1?'active':''}>卖车流程</span>
           </div>
          </div>
          <CSSTransition
            // 组件名，提供css选择器使用，必填参数，如果缺少了，程序会崩溃报错，注意这个参数带's'
            classNames='animation'
            // 组件是否展示,true为显示
            in={currProcesse===0}
            // 动画持续时间，需要和css的设置保持一致
            timeout={500}
            // 当in的属性变为false之后，卸载组件，过程可设置动画
          >
            <div className="step-content" style={{display:currProcesse===0?'flex':'none'}}>
              <div className="item">
                <img src={require('../public/img/pro-phone.png')}/>
                <div className="tit">提交意向</div>
                <div className="desc">在小胖车平台提交买车意向，小胖车专属客服将与你进行联系</div>
              </div>
              <div className="pro-jian">
                <img src={require('../public/img/pro-jiantou.png')}/>
              </div>
              <div className="item">
                <img src={require('../public/img/pro-view.png')}/>
                <div className="tit">专属管家服务</div>
                <div className="desc">一对一的专属管家将为您提供温馨服务，并安排您到店看车 </div>
              </div>
              <div className="pro-jian">
                <img src={require('../public/img/pro-jiantou.png')}/>
              </div>
              <div className="item">
                <img src={require('../public/img/pro-context.png')}/>
                <div className="tit">签署合同</div>
                <div className="desc">与销售方签订购车协议  </div>
              </div>
              <div className="pro-jian">
                <img src={require('../public/img/pro-jiantou.png')}/>
              </div>
              <div className="item">
                <img src={require('../public/img/pro-custom.png')}/>
                <div className="tit">交易过户</div>
                <div className="desc">付完款项后车辆过户至您的名下  </div>
              </div>
            </div>
          </CSSTransition>
          <CSSTransition
            // 组件名，提供css选择器使用，必填参数，如果缺少了，程序会崩溃报错，注意这个参数带's'
            classNames='animation'
            // 组件是否展示,true为显示
            in={currProcesse===1}
            // 动画持续时间，需要和css的设置保持一致
            timeout={500}
            // 当in的属性变为false之后，卸载组件，过程可设置动画
          >
            <div className="step-content" style={{display:currProcesse===1?'flex':'none'}}>
              <div className="item">
                <img src={require('../public/img/pro-sell-yuyue.png')}/>
                <div className="tit">提交信息</div>
                <div className="desc">官网或电话提交卖车需求</div>
              </div>
              <div className="pro-jian">
                <img src={require('../public/img/pro-jiantou.png')}/>
              </div>
              <div className="item">
                <img src={require('../public/img/pro-sell-pingjia.png')}/>
                <div className="tit">人车到店</div>
                <div className="desc">一对一服务，专业定价，即刻成交 </div>
              </div>
              <div className="pro-jian">
                <img src={require('../public/img/pro-jiantou.png')}/>
              </div>
              <div className="item">
                <img src={require('../public/img/pro-sell-see.png')}/>
                <div className="tit">签约过户</div>
                <div className="desc">交接完成后最快1小时内到账 </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
  )
}
export default Process;