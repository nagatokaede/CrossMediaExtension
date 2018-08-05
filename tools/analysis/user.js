'use strict'

/*
 * 用户管理
 * 创建用户、查找用户、更新用户、删除用户
 */

const log = require('../../debug/log').log;
const ERRORMSG = require('../../debug/ERRORMSG');

const create = require('../../standar_modules/database/tools/Insert').userCreate;
const find = require('../../standar_modules/database/tools/Find').userFindOne;
const update = require('../../standar_modules/database/tools/Update').userUpdate;
const remove = require('../../standar_modules/database/tools/Remove').userRemove;


let createUser = async ctx => {
    let userId = ctx.req.body.userId;

    let flag = await create(userId);
    if (!flag) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}

let findUser = async ctx => {
    let userId = ctx.req.body.userId;

    let data = await find(userId);

    if (!data) {
        if (data === undefined) {
            return ''
        } else {
            ctx.status = 500
            return ERRORMSG.SYSTEMERROR.message
        }
    }

    return data
}

let updateUser = async ctx => {
    let userId = ctx.req.body.userId;

    let flag = await update(userId);
    if (!flag) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}

let removeUser = async ctx => {
    let userId = ctx.req.body.userId;

    let flag = await remove(userId);
    if (!flag) {
        ctx.status = 500
        return ERRORMSG.SYSTEMERROR.message
    }

    return true
}


exports.createUser = createUser
exports.findUser = findUser
exports.updateUser = updateUser
exports.removeUser = removeUser
