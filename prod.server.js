var express require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/',function (req, res) {
  req.url = 'index.html'
  next()
})

// 自定义api
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 路由请求数据
var apiRoutes = express.Router();
apiRoutes.get('/seller', function(req, res) {
  res.json({
    erron: 0,
    data: seller
  })
});

apiRoutes.get('/goods', function(req, res) {
  res.json({
    erron: 0,
    data: goods
  })
});

apiRoutes.get('/ratings', function(req, res) {
  res.json({
    erron: 0,
    data: ratings
  })
});

app.use(express.static('./dist'))

app.use(router)

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})