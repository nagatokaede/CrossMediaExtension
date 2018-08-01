'use strict'

const Router = require('koa-router');

// 上传文件
const upload = require('../import/upfile').upload;

const log = require('../debug/log').log;
let logPath = (ctx, method) => {
    log(3, `请求方式 ${method} 请求地址 ${ctx.url} 并返回数据成功！`);
}

// 测试用路由端口 ---------------------------------------------
const test = new Router();

test.get('/', async ctx => {
    // get 请求测试
    ctx.body = 'get 端口测试 ok ！'
    logPath(ctx, 'GET');
});
 
test.post('/', async ctx => {
    // post 请求测试
    ctx.body = 'post 端口测试 ok ！'
    logPath(ctx, 'POST');
});


// 上传模板图像 API 路由接口 --------------------------------------
const upfile = new Router();
// 请求参数说明：
// userId: 管理员 userId
// dataBase64: 上传模板文件的 base64 格式文件

upfile.post('/', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await detect(ctx);
    });
    logPath(ctx, 'POST');
});


// 人脸融合 API 路由接口 --------------------------------------
const mergeface = new Router();
// 请求参数说明：
// userId: 用户数据库的 userId，本意为 WeChatOpenId
// templateId: 模板图片,图像数据库 userId，用户数据库的 _id
// dataBase64: 上传文件的 base64 格式文件

mergeface.post('/', async ctx => {
    // post 请求测试
    ctx.body = await upload(ctx, async err => {
        let upData = await detect(ctx);
        if (upData.msg) { // 存在错误
            return upData
        }
        
        return await merge(ctx, upData)
    });
    logPath(ctx, 'POST');
});


// 更换模板图片融合接口 ---------------------------------------
const changeFaceMerge = new Router();

changeFaceMerge.post('/', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await merge(ctx)
    });
    logPath(ctx, 'POST');
});


// 文件管理后台接口 -------------------------------------------
const fileShow = new Router();

fileShow.post('/', async ctx => {
    // post 请求测试
    ctx.body = 'post 端口测试 ok ！'
    logPath(ctx, 'POST');
});


// 装载所有路由接口
let router = new Router();
router.use('/test', test.routes(), test.allowedMethods());
router.use('/upfile', upfile.routes(), upfile.allowedMethods());
router.use('/mergeface', mergeface.routes(), mergeface.allowedMethods());
router.use('/changeFaceMerge', changeFaceMerge.routes(), changeFaceMerge.allowedMethods());
router.use('/admin', fileShow.routes(), fileShow.allowedMethods());

module.exports = router
