'use strict'

/*
 * 数据管理
 * 插入数据、查找数据、删除数据
 */

const log = require('../../debug/log').log;
const ERRORMSG = require('../../debug/ERRORMSG');

const create = require('../../standar_modules/database/tools/Insert').infoCreate;
const find = require('../../standar_modules/database/tools/Find').infoFindOne;
const remove = require('../../standar_modules/database/tools/Remove').infoRemove;


let createInfo = async (ctx, data, faceRectangle = false) => {
    let userId = ctx.req.body.userId;
    if (faceRectangle) {
        let face_rectangle = faceRectangle[0].face_rectangle
    }

    let Data = await create(data, userId, face_rectangle);
    if (!Data) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return Data
}

let findInfo = async (ctx, flag = true) => {
    let id;
    if (flag) {
        id = ctx.req.body.templateId;        
    } else {
        id = ctx.req.body.userId
    }


    let Data = await find(id);
    if (!Data) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return Data
}

let removeInfo = async ctx => {
    let userId = ctx.req.body.userId;

    let flag = await remove(userId);
    if (!flag) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}


exports.createInfo = createInfo
exports.findInfo = findInfo
exports.updateInfo = updateInfo
exports.removeInfo = removeInfo
