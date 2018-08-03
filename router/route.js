'use strict'

const Router = require('koa-router');

// 上传文件
const upload = require('../standar_modules/multer/upfile');
// 连接文件
const splicer = require('../tools/splicer');

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



// 上传 base64 API 路由接口 --------------------------------------
const upfile = new Router();

// 上传 base64 文件接口
mergeface.post('/base64', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await splicer.upfileBase64(ctx);
    });
    logPath(ctx, 'POST');
});



// face++ 人脸融合项目总路由 ------------------------------------
const mergeface = new Router();

// 上传模板图像 API 路由接口 
mergeface.post('/detect', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await splicer.detectFun(ctx);
    });
    logPath(ctx, 'POST');
});

// 人脸融合 API 路由接口 
mergeface.post('/merge', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await splicer.mergeFaceFun(ctx);
    });
    logPath(ctx, 'POST');
});

// 更换模板图片融合接口
mergeface.post('/change', async ctx => {
    ctx.body = await upload(ctx, async err => {
        return await splicer.changeTemplateFun(ctx);
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
router.use('/admin', fileShow.routes(), fileShow.allowedMethods());

module.exports = router
