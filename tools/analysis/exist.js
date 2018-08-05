'use strict'

const fs = require('fs');

// 判断文件是否已存在
let exist = (userInfoMsg, ctx) => { 
    // userInfoMsg: 用户之前上传的图像所存储的信息
    dir(userInfoMsg, `判断文件是否已存在 userInfoMsg`);
    
    let fileName = userInfoMsg.upFileInfo.fileName

    let url_list = fileName.split('.');
    let base = url_list[0] + `_merge_${ctx.req.body.templateId}.` + url_list[1]

    let MergeImagePath = userInfoMsg.upFileInfo.filePath + base

    if (!fs.accessSync(MergeImagePath)) { // 如果融合文件已存在
        log(3, '融合图像已存在！');
        return {
            "mergeId": userInfoMsg._id,
            "filename": fileName, 
            "web_url": userInfoMsg.upFileInfo.fileWebURL,
            "mimetype": "image/jpeg"
        }
    }

    return false
}

module.exports = exist