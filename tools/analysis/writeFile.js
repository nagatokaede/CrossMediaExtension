'use strict'

/*
 * 存储使用 base64 方式上传的文件
 * 返回文件存储信息
 */

const log = require('../../debug/log').log;

const ERRORMSG = require('../../debug/ERRORMSG');

const create = require('../../standar_modules/fs/create');

let upfile = async ctx => { // 存储上传图像
    log(4, '开始写入上传文件！');
    // 创建文件夹返回本地路径 local_path 和网络路径 web_url
    let files = create.createFiles(ctx.req.body.userId);

    // 处理上传文件 base64 数据
    let basefile = ctx.req.body.dataBase64;
    let base64Data = basefile.replace(/^data:image\/\w+;base64,/, "");
    // 修改文件名
    let base = Date.now() + '.jpg'
    let path = `${files.local_path}`
    // 写入文件
    let File = await create.createFile(path + base, base64Data);
    // 返回信息处理
    if (!File) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return {
        "filename": base, 
        "path": path,
        "web_url": files.web_url,
        "mimetype": "image/jpeg"
    }
}


let coverage = async (file, data) => { // 美颜图像覆盖
    let File = await create.createFile(file.path + file.filename, data.result);
    if (!File) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}


let saveMergeFile = async (mergeMsg, detectMsg, ctx) => { // 存储人脸融合图像
    // mergeMsg: 调用融合 API 返回的数据，主要用到融合图像 base64 数据
    // detectMsg： 用户上传的自己的图像存储后返回的文件路径信息
    // ctx: 这里主要用到 templateId 来固定融合后图像的名称
    
    let templateId = ctx.req.body.templateId
    let fileName = detectMsg.upFileInfo.fileName

    let url_list = fileName.split('.');
    let base = url_list[0] + `_merge_${templateId}.` + url_list[1]

    let File = await create.createFile(detectMsg.upFileInfo.filePath + base, mergeMsg.result);
    if (!File) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return {
        "mergeId": detectMsg._id,
        "filename": base, 
        "web_url": detectMsg.upFileInfo.fileWebURL,
        "mimetype": "image/jpeg"
    }
}

exports.upfile = upfile
exports.coverage = coverage
exports.saveMergeFile = saveMergeFile