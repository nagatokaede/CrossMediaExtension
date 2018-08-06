'use strict'

/*
 * 人脸识别
 * 返回人脸信息的数组
 */

const log = require('../../debug/log').log;

const ERRORMSG = require('../../debug/ERRORMSG');

const reqDetectAPI = require('../../development_modules/face++/DetectAPI/reqDetectAPI');

let detect = async (ctx, file) => {
    log(4, `存储图像路径，请求人脸识别\n${file.web_url + file.filename}`)
    let data = await reqDetectAPI(file.web_url + file.filename);
    if (!data) {
        if (data === undefined) {
            ctx.status = 400
            return ERRORMSG.FACEERROR.message
        } else {
            ctx.status = 500
            return ERRORMSG.SYSTEMERROR.message
        }
    }

    return data
} 

module.exports = detect