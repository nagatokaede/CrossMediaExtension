'use strict'

const log = require('../../../debug/log').log;
const dir = require('../../../debug/log').dir;

const UserModel = require('../modules/UserModel');
const InfoModel = require('../modules/InfoModel');

const userFindOne = require('./Find').userFindOne;

// 插入数据
let infoCreate = async (file, userId, faceRectangle) => {
    dir(file, `插入数据信息`);
    log(4, `userId: ${userId}; faceRectangle: ${faceRectangle}`);
    
    return new Promise((resolve, reject) => { // 插入数据信息
        let createInfo = new InfoModel({
            userId: userId, 
            upFileInfo: {
                fileName: file.filename, 
                filePath: file.path, 
                fileWebURL: file.web_url, 
                fileType: file.mimetype, 
                faceRectangle: faceRectangle
            }
        });

        createInfo.save(err => { // 保存数据
            if (err) { 
                log(0, `存入上传图像信息失败！ ${err}`); 
                resolve(false);
                
            } else {
                log(3, `上传图像信息保存成功！！`);
                resolve(createInfo._doc);
            }
        });
    });
} 

// 插入用户
let userCreate = async userId => {
    let userFind = await userFindOne(userId);
    if (userFind) { 
        log(4, `用户已存在 userId：${userId}`);
        return userFind 
    }

    log(4, `创建用户 userId：${userId}`); 
    return new Promise(resolve => { // 插入用户  
        let createUser = new UserModel({ 
            userId: userId
        });

        createUser.save(err => { // 保存数据
            if (err) { // 用户创建失败！
                log(1, `用户创建失败！ ${err}`);
                resolve(false);
                
            } else {
                log(3, `用户创建成功！！`);
                resolve(true);
            }
        });        
    });
}


exports.userCreate = userCreate
exports.infoCreate = infoCreate
