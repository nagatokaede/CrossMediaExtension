'use strict'

const log = require('../../debug/log').log;
const dir = require('../../debug/log').dir;

const fs = require('fs');

// 判断文件是否已存在
let exist = (userInfoMsg, ctx) => { 
    // userInfoMsg: 用户之前上传的图像所存储的信息
    dir(userInfoMsg, `判断文件是否已存在 userInfoMsg`);
    
    let fileName = userInfoMsg.upFileInfo.fileName

    let url_list = fileName.split('.');
    let base = url_list[0] + `_merge_${ctx.req.body.templateId}.` + url_list[1]

    let MergeImagePath = userInfoMsg.upFileInfo.filePath + base

    try {
        fs.accessSync(MergeImagePath, fs.constants.R_OK | fs.constants.W_OK);
        log(3, '融合图像已存在！');
        return {
            "mergeId": userInfoMsg._id,
            "filename": base, 
            "web_url": userInfoMsg.upFileInfo.fileWebURL,
            "mimetype": "image/jpeg"
        }
    } catch {
        return false
    }
    
}

module.exports = exist