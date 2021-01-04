// 基础功能的设置：设置返回数据的格式、获取path、解析query、处理不同的路由、展示数据
// 引用原生模块queryString
const querystring = require('querystring');
// 引用handleBlogRouter模块
const handleBlogRouter = require('./src/router/blog');
// 引用handleUserRouter模块
const handleUserRouter = require('./src/router/user');

// 用于处理 postData
const getPostData = (req) => {
    const promise = new Promise((resolve,reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        // 到此则说明：数据格式跟请求均正确
        // 接收数据
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            //没有数据，为空时
            if (!postData) {
                resolve({});
                return;
            }
            //数据不为空
            resolve(
                JSON.parse(postData) //字符串转化为JSON对象
            )

        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);
    
    // 处理 postData
    getPostData(req).then(postData => {
        req.body = postData;
        
        // 处理 blog 路由
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            res.end(
                JSON.stringify(blogData)//将对象转换为JSON格式的字符串
            )
            return; 
        }

        // 处理 user 路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)//将对象转换为JSON格式的字符串
            )
            return; 
        }
        
        // 未命中路由，返回 404
        // 返回404状态码,将类型改为纯文本,内容为404 Not Fount
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Fount\n")
        res.end()
        });
}

module.exports = serverHandle

// process.env.NODE_ENV
