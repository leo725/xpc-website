import React from 'react'
import { message, Icon, Input, Button } from 'antd'
import '../public/style/components/dialog.scss'

const Dialog = (props)=>{
  var {  visible, title, logo, hideTitle } = props
  return(
    <div className="dialogs"  style={{display:visible?'block':'none'}}>
      <div className="dialog-main">
        <div className="dialog-close" onClick={props.hideDialog}><Icon type="close" /></div>
        <div className="dialog-body">
          <div className='dialog-header' style={{display:hideTitle?'none':'block'}}>{title}</div>
          {
            !!logo ? (
              <img src={logo} style={{display:hideTitle?'none':'block'}} className='dialog-circle-logo' />
            ):(<></>)
          }
          {
            props.children
          }
        </div>
      </div>
    </div>
  )
}

export default Dialog;