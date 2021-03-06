'use strict'

const UpFileType = require('../../setting').UpFileType;

const log = require('../../debug/log').log;
const dir = require('../../debug/log').dir;
const ERRORMSG = require('../../debug/ERRORMSG');

const multer = require('koa-multer');

const createFiles = require('../fs/create').createFiles;


let createFileName = (ctx, file) => {
    // 以点分割成数组，数组的最后一项就是后缀名
    let fileFormat = (file.originalname).split(".");
    let suffix = fileFormat[fileFormat.length - 1].toLowerCase();

    return `${Date.now()}.${suffix}`
}

// multer 配置
let storage = multer.diskStorage({
    // 文件保存路径
    destination: (ctx, file, cb) => {
        dir(ctx.body, `文件上传时的请求 body `);
        cb(null, createFiles(ctx.req.body.userId).local_path);
    },
    // 修改文件名称
    filename: (ctx, file, cb) => {
        cb(null, createFileName(ctx, file));
    }
})
// 加载配置
let upload = multer({ 
    storage: storage, 
    limits: { filesSize: 2 * 1024 * 1024 }, 
    fileFilter: (ctx, file, cb) => {
        log(4, `file.size: ${file.size}`);
        dir(file, `file dir`);
        if (UpFileType.indexOf(file.mimetype) == '-1') {
            log(1, `${ctx.req.body.userId} 该用户上传了非法类型文件 ${file.mimetype}`);
            ctx.fileValidationError = ERRORMSG.FILETYPEERROR.message;
            log(4, `ctx.fileValidationError1: ${ctx.fileValidationError}`);
            return cb(null, false, new Error(ERRORMSG.FILETYPEERROR.message));
        }
         
        log(3, `合法的文件类型`);
        return cb(null, true);
    }
}).array('file', 1);

module.exports = upload