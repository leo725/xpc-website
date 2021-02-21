const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    // 首页
    server.get('/', (req, res) => {
      const actualPage = '/index'
      var ip  = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
      var queryParams = {...req.params,...req.query};
      if(ip && ip.match(/\d+\.\d+\.\d+\.\d+/)){
        queryParams.userIp = ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
      }
      app.render(req, res, actualPage, queryParams)
    })

    // 首页
    server.get('/index/:cityName', (req, res) => {
      const actualPage = '/index'
      var queryParams = {...req.params,...req.query};
      app.render(req, res, actualPage, queryParams)
    })

    // 买车
    server.get('/buyCar', (req, res) => {
      const actualPage = '/buyCar'
      var ip  = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
      var queryParams = {...req.params,...req.query};
      res.cookie('user_ip',ip);
      if(ip && ip.match(/\d+\.\d+\.\d+\.\d+/)){
        queryParams.userIp = ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
      }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/buyCar/:cityName', (req, res) => {
      const actualPage = '/buyCar'
      var queryParams = {...req.params,...req.query};
      if(queryParams.userIp){
        delete queryParams.userIp
      }
      app.render(req, res, actualPage, queryParams)
    })
    
    // 关于我们
    server.get('/about/:type/:pageIndex', (req, res) => {
      const actualPage = '/about'
      var queryParams = {}
      if(req.params.type){
        queryParams = req.params
      }
      app.render(req, res, actualPage, queryParams)
    })
    // 新闻详情页
    server.get('/newsDetail/:type/:id', (req, res) => {
      const actualPage = '/newsDetail'
      const queryParams = req.params
      app.render(req, res, actualPage, queryParams)
    })
    // 车源详情页
    server.get('/buyCarDetail/:id', (req, res) => {
      const actualPage = '/buyCarDetail'
      const queryParams = req.params
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    let post = dev ? 3033 : 1089
    server.listen(post, err => {
      if (err) throw err
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })