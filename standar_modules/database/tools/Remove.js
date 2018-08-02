'use strict'

const log = require('../../../debug/log').log;
const dir = require('../../../debug/log').dir;

const UserModel = require('../modules/UserModel');
const InfoModel = require('../modules/InfoModel');


// 删除单个图片信息
let infoRemove = (infoId) => {
    return new Promise(resolve => {
        InfoModel.remove({'_id': infoId}, err => {
            if (err) { // 删除数据失败
                log(0, `删除数据失败： \n${err}`);
                resolve(false);
                
            } else { // 查询数据成功
                log(3, '删除数据成功！');
                resolve(true);
            }
        });
    });
}

// 删除用户信息
let userRemove = (userId) => {
    return new Promise(resolve => {
        InfoModel.deleteMany({'userId': userId}, err => {
            if (err) { // 删除数据失败
                log(0, `删除数据失败： \n${err}`);
                resolve(false);
                
            } else { // 查询数据成功
                log(3, '删除数据成功！');
                resolve(true);
            }
        });

        UserModel.remove({'userId': userId}, err => {
            if (err) { // 删除用户失败
                log(0, `删除用户失败：\n${err}`);
                resolve(false);
                
            } else { // 查询数据成功
                log(3, '删除用户成功！');
                resolve(true);
            }
        });
    });
}


exports.infoRemove = infoRemove
exports.userRemove = userRemove