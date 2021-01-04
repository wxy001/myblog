//根据路由处理请求参数；再根据参数，返回正确格式的数据
const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 对应接口的具体处理
const handleBlogRouter = (req, res) => {
    const method = req.method;  //GET POST

    const id = req.query.id; // 获取请求参数id,可通用

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyworld = req.query.keyworld || '';
        const listData = getList(author, keyworld);
        return new SuccessModel(listData,'获取博客列表成功');
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const detaiData = getDetail(id);
        return new SuccessModel(detaiData,'获取博客详情成功');
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/add') {
        const addData = addBlog(req.body);//返回博客ID
        return new SuccessModel(addData,'新建博客成功');
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body);//返回true或false
        if (result) {
            return new SuccessModel('更新博客成功');
        } else {
            return new ErrorModel('更新博客失败');
        }
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel('删除博客成功');
        } else {
            return new ErrorModel('删除博客失败');
        }
    }
}

module.exports = handleBlogRouter