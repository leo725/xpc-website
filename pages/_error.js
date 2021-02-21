import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Icon } from 'antd';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <main className='error-page wrap-lg'>
        <Head>
          <title>小胖二手车</title>
          <link rel='icon' href={require('../public/favicon.ico')} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
          <meta name="viewport" content="initial-scale=0.3, maximum-scale=0.5, minimum-scale=0.3, user-scalable=yes" />
          <meta name="renderer" content="webkit"/>
          {/* <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.14&key=69dfa52c5cc477b041e0129edbb149a0"></script>
          <script src="https://webapi.amap.com/ui/1.0/main.js"></script> */}

        </Head>
        <div>
          <img src={require('../public/img/404.gif')} />
        </div>
        <div className='txt-box'>
          <p className='ay'>哎呀！</p>
          <p className='txt'>页面好像走丢了... </p>
        </div>
        <Link href='/' replace><a className='link-home'>返回首页</a></Link>
        <style global jsx>{`
        .error-page{
            text-align: center;
            min-height:500px;
            color: #999;
            font-size:16px;
        }
        .txt-box{
          width: 164px;
          margin:0 auto 20px;
          text-align: left;
        }
        .ay{
          font-size: 20px;
          margin-bottom:0;
        }
        .link-home{
            font-size:16px;
            padding:0 10px;
        }
        .link-home{
          background: #ff7300;
          margin: 0 auto;
          width:160px;
          display:block;
          line-height:40px;
          color:#fff;
          text-align: center;
          border-radius: 4px;
        }
        `}</style>
      </main>
    )
  }
}
