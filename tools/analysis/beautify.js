'use strict'

/*
 * 美颜
 * 返回美颜后图像的 base64 数据
 */

const log = require('../../debug/log').log;

const ERRORMSG = require('../../debug/ERRORMSG');

const reqBeautifyAPI = require('../../development_modules/face++/BeautifyAPI/reqBeautifyAPI');

let detect = async file => {
    let data = await reqBeautifyAPI(file.web_url);
    if (!data) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return data
} 

module.exports = detect
