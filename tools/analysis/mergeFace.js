'use strict'

/*
 * 人脸融合
 * 返回融合后图像 base64 信息
 */

const log = require('../../debug/log').log;
const dir = require('../../debug/log').dir;

const ERRORMSG = require('../../debug/ERRORMSG');

const reqMergeFaceAPI = require('../../development_modules/MergeFaceAPI/reqMergeFaceAPI');

let faceRectangleFun = fr => {
    // 处理数据中的人脸框信息
    let faceRectangle = `${fr.top}, ${fr.left}, ${fr.width}, ${fr.height}`; 
    return faceRectangle
}

let detect = async (detectMsg, templateMsg) => {
    dir(detectMsg, '用户上传图像的信息');
    dir(templateMsg, '模板图像的信息');

    // 模板图像信息
    let template_url = templateMsg.upFileInfo.fileWebURL
    let template_rectangle = faceRectangleFun(templateMsg.upFileInfo.faceRectangle);

    // 用户图像信息
    let merge_url = detectMsg.upFileInfo.fileWebURL
    let merge_rectangle = faceRectangleFun(detectMsg.upFileInfo.faceRectangle);

    // 人脸融合 API
    let data = await reqMergeFaceAPI(template_url, template_rectangle, merge_url, merge_rectangle);
    if (!data) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return data
} 

module.exports = detect
