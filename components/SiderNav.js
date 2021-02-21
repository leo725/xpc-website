import React,{useState,useEffect,useCallback} from 'react'
import '../public/style/components/siderNav.scss'
import { Icon, Popover, BackTop } from 'antd';
import $vx from '../public/js/vx'
const SiderNav = () => {
  const [isShow,setIsShow] = useState(false)
  const [isPhone,setIsPhone] = useState(false)
  const content = (
    <div style={{overflow:'hidden',textAlign:'center',fontSize:'14px'}}>
      <img src={require('../public/img/appCode.png')} style={{width: 108}} />
      <div>下载APP了解更多信息</div>
    </div>
  );
  const content2 = (
    <div style={{overflow:'hidden',textAlign:'center',fontSize:'14px'}}>
      <img src={require('../public/img/wechatCode.png')} style={{width: 108}} />
      <div>关注公众号了解更多信息</div>
    </div>
  );
  const toggleSideBar = ()=>{
    let siderNav = document.querySelector('.siderNav')
    !isShow ? siderNav.classList.add('click-active') : siderNav.classList.remove('click-active')
    setIsShow(!isShow)
  }
  const onResize = useCallback(() => {
    let Width = document.documentElement.clientWidth
    let siderNav = document.querySelector('.siderNav')
    if (Width<=1280) {
      siderNav.classList.add('w1280')
    } else{
      siderNav.classList.remove('w1280')
    }
  }, [])
  useEffect(() => {
    setIsPhone($vx.isMobile())
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return(
    <>
      <div className="siderNav" style={{display:isPhone?'none':'block'}}>
        <div className="toolbar-l" onClick={toggleSideBar}>
          工<br/>具<br/>栏<br/>
          <Icon type="left" rotate={isShow?'180':'0'}  style={{marginTop:'6px'}}/>
        </div>
        <div className="fix-right" >
          <div className="toolbar">
            <Popover content={content} placement="left"  trigger="hover">
              <div className="tool">
                <Icon type="download"  style={{color:'#fff',fontSize:'20px'}}/>
              </div>
            </Popover>
            <Popover content={content2} placement="left"  trigger="hover">
              <div className="tool">
                <Icon type="wechat"  style={{color:'#fff',fontSize:'20px'}}/>
              </div>
            </Popover>
            <Popover Popover Popover content = { `免费咨询 400-8119-870` } placement = "left"
            trigger = "hover" >
              <div className="tool">
                <Icon type="phone" rotate={90}  style={{color:'#fff',fontSize:'20px'}}/>
              </div>
            </Popover>
            <BackTop style={{ top: '490px',right:'0',lineHeight:'40px'}}>
              <Icon type="vertical-left" rotate={-90} style={{color:'#fff',fontSize:'20px'}}/>
            </BackTop>
          </div>
        </div>
      </div>

    </>
  )
}

export default SiderNav
