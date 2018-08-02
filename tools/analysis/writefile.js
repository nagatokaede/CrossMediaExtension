'use strict'

/*
 * 存储使用 base64 方式上传的文件
 * 返回文件存储信息
 */

const log = require('../../debug/log').log;

const ERRORMSG = require('../../debug/ERRORMSG');

const create = require('../../standar_modules/fs/create');

let writefile = async ctx => {
    log(4, '开始写入上传文件！');
    // 创建文件夹
    let Files = create.createFiles(ctx.req.body.userId);

    // 处理上传文件 base64 数据
    let basefile = ctx.req.body.dataBase64;
    let base64Data = basefile.replace(/^data:image\/\w+;base64,/, "");
    // 修改文件名
    let base = Date.now() + '.jpg'
    let path = `${filesPath.local_path}${base}`
    // 写入文件
    let File = await create.createFile(path, base64Data);
    // 返回信息处理
    if (File) {
        return {
            "filename": base, 
            "path": path,
            "web_url": filesPath.web_url + base,
            "mimetype": "image/jpeg"
        }
        
    } else { 
        return ERRORMSG.SYSTEMERROR.message
    }
}

module.exports = writefile