'use strict'

module.exports = {
    USERERROR: {
        message: {
            code: 400, 
            msg: '用户验证错误'
        } 
    }, 
    FILETYPEERROR: {
        message: {
            code: 400, 
            msg: '不支持的上传文件类型'
        } 
    }, 
    SIZEERROR: {
        message: {
            code: 400, 
            msg: '上传图像大于 2M'
        } 
    }, 
    NUMBERERROR: {
        message: {
            code: 400, 
            msg: '图像上传超过 2 张'
        } 
    }, 

    FINDERROR: {
        message: {
            code: 400, 
            msg: '未能找到该 ID 下的模板图像'
        } 
    }, 
    FACEERROR: {
        message: {
            code: 400, 
            msg: '未能检测到人脸'
        } 
    }, 
    SYSTEMERROR: {
        message: {
            code: 500, 
            msg: '系统内部错误'
        } 
    }
}
