// 数据处理
// 博客列表
const getList = (author, keyworld) => {
    // 先返回假数据（格式是正确的）
    return [
        {
            id: 1,
            title: '标题A',
            Content: '内容A',
            createTime:'1609671595823',
            author:'张三'
        },
        {
            id: 2,
            title: '标题B',
            Content: '内容B',
            createTime:'1609671595811',
            author:'李四'
        }
    ]
}

// 博客详情
const getDetail = (id) => {
    // 返回假数据
    return {
            id: 1,
            title: '标题A',
            Content: '内容A',
            createTime:'1609671595823',
            author:'张三'
    }
}

// 新建博客
//(blogData = {}) 兼容：blogData为空就给个空对象,es6语法
const addBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    console.log('newBlog blogData...',blogData);
    return {
        id: 3  // 表示新建博客成功，返回插入成功后的id
    }
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
    // id 为需要更新的博客id
    // blogData 是一个博客对象，包含 title content 属性

    console.log('update blog',id,blogData);
    return true;//表示更新成功
}

// 删除博客
const delBlog = (id = {}) => {
    // id 为删除的博客id
    console.log(id);
    return true;
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}