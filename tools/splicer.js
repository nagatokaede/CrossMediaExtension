'use strict'

const log = require('../debug/log').log;

const detect = require('./analysis/detect');
const beautify = require('./analysis/beautify');
const mergeFace = require('./analysis/mergeFace');
const info = require('./analysis/info');
const user = require('./analysis/user');
const writeFile = require('./analysis/writeFile');
const exist = require('./analysis/exist');
const multerData = require('./analysis/multerData');

// ------------- 美颜 --------------

let beautifyFun = async (file) => {
    // 图像美颜
    let data = await beautify(ctx, file);
    if (data.message) { return data }

    // 覆盖图像
    return await writeFile.coverage(file, data);
}

// ------------- 融合 ----------------

let mergeFun = async (ctx, userInfoMsg, flag) => {
    // 查询模板
    let templateMsg = await info.findInfo(ctx);
    if (templateMsg.message) { return templateMsg } 

    // 判断此次融合请求是否是之前请求过的：更换模板
    if (flag) {
        let existMsg = exist(userInfoMsg, ctx);
        if (existMsg) { return existMsg }
    }

    // 人脸融合
    let mergeMsg = await mergeFace(ctx, userInfoMsg, templateMsg);
    if (mergeMsg.message) { return mergeMsg }

    // 存储图像
    return await writeFile.saveMergeFile(mergeMsg, userInfoMsg, ctx);
}

/* ------------- 上传 base64 数据保存 --------------
 * userId: WeChatOpenId
 * dataBase64: image base64 data
 * beautify: beautify switch
 */
let upfileBase64 = async (ctx) => {
    // 存储上传图像
    let file = await writeFile.upfile(ctx);
    if (file.message) { return file }

    // 创建用户
    let userMsg = await user.createUser(ctx);
    if (userMsg.message) { return userMsg }

    // 美颜
    if (ctx.req.body.beautify == true) {
        let beaut = await beautifyFun(file);
        if (beaut.message) { return beaut }
    }

    // 存储数据
    let data = await info.createInfo(ctx, file);
    if (data.message) { return data }

    return data.upFileInfo.fileWebURL + data.upFileInfo.fileName
}




/* ------------- 人脸识别 --------------
 * userId: WeChatOpenId
 * dataBase64: image base64 data
 * beautify: beautify switch
 */
let detectFun = async (ctx) => {
    // 存储上传 base64 图像
    let file;
    if (ctx.req.body.beautify) {
        file = await writeFile.upfile(ctx);
        if (file.message) { return file }
    } else {
        file = multerData(ctx);
    }

    // 创建用户
    let userMsg = await user.createUser(ctx);
    if (userMsg.message) { return userMsg }

    // 人脸识别
    let faceRectangle = await detect(ctx, file);
    if (faceRectangle.message) { return faceRectangle }

    // 美颜
    if (ctx.req.body.beautify == true) {
        let beaut = await beautifyFun(file);
        if (beaut.message) { return beaut }
    }

    // 存储数据
    return await info.createInfo(ctx, file, faceRectangle);
}

/* ------------- 人脸融合 --------------
 * userId: WeChatOpenId
 * dataBase64: image base64 data
 * beautify: beautify switch
 * templateId: templateId database _id
 */
let mergeFaceFun = async (ctx) => {
    // 人脸识别
    let detectMsg = await detectFun(ctx);
    if (detectMsg.message) { return detectMsg }

    // 人脸融合
    return mergeFun(ctx, detectMsg, false);
}

/* ------------- 更换模板 --------------
 * userId: WeChatOpenId
 * templateId: templateId database _id
 */

let changeTemplateFun = async (ctx) => {
    // 查询用户图像信息
    let userInfoMsg = await info.findInfo(ctx, false);
    if (userInfoMsg.message) { return userInfoMsg } 

    // 人脸融合
    return mergeFun(ctx, userInfoMsg, true);
}



exports.upfileBase64 = upfileBase64
exports.detectFun = detectFun
exports.mergeFaceFun = mergeFaceFun
exports.changeTemplateFun = changeTemplateFun

