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


let createInfo = async (ctx, data, faceRectangle) => {
    userId = ctx.req.body.userId;

    let Data = await create(data, userId, faceRectangle[0].face_rectangle);
    if (!Data) {
        return ERRORMSG.SYSTEMERROR.message
    }

    return Data
}

let findInfo = async ctx => {
    userId = ctx.req.body.userId;

    let data = await find(userId);
    if (!data) {
        return ERRORMSG.SYSTEMERROR.message
    }

    return data
}

let removeInfo = async ctx => {
    userId = ctx.req.body.userId;

    let flag = await remove(userId);
    if (!flag) {
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}


exports.createInfo = createInfo
exports.findInfo = findInfo
exports.updateInfo = updateInfo
exports.removeInfo = removeInfo
