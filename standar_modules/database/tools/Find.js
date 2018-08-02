'use strict'

const log = require('../../../debug/log').log;
const dir = require('../../../debug/log').dir;

const UserModel = require('../modules/UserModel');
const InfoModel = require('../modules/InfoModel');


// 查询单个图片信息
let infoFindOne = (infoId) => {
    return new Promise(resolve => {
        InfoModel.findOne({'_id': infoId}, (err, docs) => {
            if (err) { // 数据查询失败
                log(0, `数据查询失败：\n${err}`);
                resolve(false);
                
            } else if (!docs) { // infoId 不存在
                log(1, `图像数据查询 infoId: ${infoId} 不存在`);
                resolve(undefined);
                
            } else { // 查询数据成功
                dir(docs._doc, `数据查询结果`);
                resolve(docs._doc);
            }
        });
    });
}

// 查询用户信息
let userFindOne = (userId) => {
    return new Promise(resolve => {
        UserModel.findOne({'userId': userId}, (err, docs) => {
            if (err) { // 数据查询失败
                log(0, `用户查询失败：\n${err}`);
                resolve(false);
                
            } else if (!docs) { // userId 不存在
                log(1, `用户数据查询 userId: ${userId} 不存在`);
                resolve(undefined);
                
            } else { // 查询数据成功
                dir(docs._doc, `数据查询结果`);
                resolve(docs._doc);
            }
        });
    });
}


exports.infoFindOne = infoFindOne
exports.userFindOne = userFindOne