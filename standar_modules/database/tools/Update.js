'use strict'

const log = require('../../debug/log').log;

const UserModel = require('../modules/UserModel');

// 更新用户信息
let userUpdate = userId => {
    log(4, `查询用户 Id：${userId}`);

    return new Promise((resolve, reject) => { // 更新用户信息
        UserModel.findOne({ // 查询用户
            userId: userId

        }, (err, doc) => {
            if (err) { // 查询用户出错！！
                log(0, `查询用户出错！！ ${err}`);
                resolve(false);
                
            } else { // 数据库操作
                doc.userMsg.fois++; // 增加接口调用次数
                doc.save(err => { // 保存用户数据
                    if (err) {
                        log(0, `用户数据更新失败！ ${err}`);
                        resolve(false);
                        
                    } else {
                        log(3, `用户数据更新！！`);
                        resolve(doc.id);
                    }
                });
            }
        });          

    });
}


module.exports = userUpdate