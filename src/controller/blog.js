// 数据处理

// 引入执行sql函数
const { exec } = require('../db/mysql');


// 博客列表
const getList = (author, keyworld) => {
    // // 先返回假数据（格式是正确的）
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         Content: '内容A',
    //         createTime:'1609671595823',
    //         author:'张三'
    //     },
    //     {
    //         id: 2,
    //         title: '标题B',
    //         Content: '内容B',
    //         createTime:'1609671595811',
    //         author:'李四'
    //     }
    // ]
    
    // 先定义sql语句
    let sql = `select * from blogs where 1 = 1 `;//where 1 = 1 永远成立,后面记得空格否则会跟后面的语句连接会报错
    if (author) {
        sql += `and author = '${author}'`;
    }
    if (keyworld) {
        sql += `and title like '%${keyworld}%'`;
    }
    sql += `order by createtime desc;`;

    // 返回promise
    return exec(sql);
}

// 博客详情
const getDetail = (id) => {
    // 返回假数据
    // return {
    //         id: 1,
    //         title: '标题A',
    //         Content: '内容A',
    //         createTime:'1609671595823',
    //         author:'张三'
    // }
    let sql = `select * from blogs where id = '${id}' `;//where 1 = 1 永远成立,后面记得空格否则会跟后面的语句连接会报错
    
    // 返回promise
    return exec(sql).then(rows => {
        return rows[0];//rows是一个数组，rows[0]是一个对象，将数据变为一个对象
    });
}

// 新建博客
//(blogData = {}) 兼容：blogData为空就给个空对象,es6语法
const addBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 等属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `
       insert into blogs (title,content,createtime,author) 
       values ('${title}','${content}',${createTime},'${author}')
    `;
    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData);//insertData表示执行sql后返回的信息
        return {
            "id": insertData.insertId // 表示新建博客成功，返回插入成功后的id
        }
    })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
    // id 为需要更新的博客id
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title;
    const content = blogData.content;

    const sql = `
       update blogs set title = '${title}', content = '${content}' where id = ${id}
    `;
    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData);//insertData表示执行sql后返回的信息
        if (updateData.affectedRows > 0) {
            return true;//表示更新成功
        }
        return false;//表示更新失败
    });
}

// 删除博客
const delBlog = (id, author = {}) => {
    // id 为删除的博客id
    const sql = `delete from blogs where id = ${id} and author = '${author}'`;//增加autor可以保证博客删除时候安全性问题，不会导致我删除了别人的文章
    return exec(sql).then(delData => {
        console.log('delData is ', delData);//insertData表示执行sql后返回的信息
        if (delData.affectedRows > 0) {
            return true;//表示删除成功
        }
        return false;//表示删除失败);
    })
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}