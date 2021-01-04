const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);//错误，则打印错误信息
                return;
            }
            resolve(result);//正确，则打印结果
        })
    })
    return promise;
}

//不需要再关闭连接，类似于单例模式

module.exports = {
    exec
}