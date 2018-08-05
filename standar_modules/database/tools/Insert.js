'use strict'

const log = require('../../../debug/log').log;

const UserModel = require('../modules/UserModel');

// 插入数据
let infoCreate = async (data, userId, faceRectangle) => {
    dir(data, `插入数据信息`);
    log(4, `userId: ${userId}; faceRectangle: ${faceRectangle}`);
    
    return new Promise((resolve, reject) => { // 插入数据信息
        let createInfo = new UpFilesInfoModel({
            userId: userId, 
            upFileInfo: {
                fileName: data.filename, 
                filePath: data.path, 
                fileWebURL: data.web_url, 
                fileType: data.mimetype, 
                faceRectangle: faceRectangle.face_rectangle
            }
        });

        createInfo.save(err => { // 保存数据
            if (err) { 
                log(0, `存入上传图像信息失败！ ${err}`); 
                resolve(false);
                
            } else {
                log(3, `上传图像信息保存成功！！`);
                resolve(createInfo);
            }
        });
    });
} 

// 插入用户
let userCreate = userId => {
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
