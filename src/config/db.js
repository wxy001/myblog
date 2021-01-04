// const env = process.env.NODE_ENV  //环境参数
const env = 'dev';//先写死

// 配置:模拟本地或远程
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',//创建域
        user: 'root',
        password: '123456',
        port: '3306',//端口
        database:'myblog'//数据库名
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',//创建域
        user: 'root',
        password: '123456',
        port: '3306',//端口
        database:'myblog'//数据库名
    }
}

module.exports = {
    MYSQL_CONF
}