let express = require('express');
app = express();

/**读取body中的json请求数据，前端post请求时发送来的json对象 */
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())