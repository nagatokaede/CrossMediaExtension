'use strict'

const log = require('../debug/log').log;

const detect = require('./analysis/detect');
const info = require('./analysis/info');
const user = require('./analysis/user');
const writefile = require('./analysis/writefile');

// ------------- 保存上传文件 --------------
let savefile = async (ctx) => {
    return await writefile(ctx)
}


// ------------- 美颜 --------------



// ------------- 人脸识别 --------------

let detectFun = async (ctx) => {
    // 存储上传图像
    let file = await savefile(ctx);
    // 创建用户
    let userMsg = user.createUser(ctx);
    // 人脸识别
    let faceRectangle = detect(file);
    // 存储数据
    let infoMsg = info.createInfo(ctx, file, faceRectangle);
    // 返回信息
    return 
}

// ------------- 人脸融合 --------------


