const { loginCheck } = require('../controller/user');
const { SuccessModel,ErrorModel } = require('../model/resModel');
const handleUserRouter = (req, res) => {
    const method = req.method  //GET POST
    
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;//解构
        const result = loginCheck(username, password);//返回true或false
        if (result) {
            return new SuccessModel('登录成功');
        } else {
            return new ErrorModel('登录失败');
        }
    }
}

module.exports = handleUserRouter