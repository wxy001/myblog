// 响应的数据格式
class BaseModel{
    //data是对象类型，message是字符串类型
    constructor(data, message) {
        // 如果第一个传字符串类型，第二个没传 要兼容，使得传参可以是 对象+字符串 也可以是 字符串
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// 响应成功的数据模型
class SuccessModel extends BaseModel{
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

// 响应失败的数据模型
class ErrorModel extends BaseModel{
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}