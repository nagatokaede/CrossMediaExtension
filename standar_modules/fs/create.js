'use strict'

const server = require('../../setting').server;

const log = require('../../debug/log').log;

const fs = require('fs');
const path = require('path');

let mkdirs = dirname => {
    if ( fs.existsSync(dirname) ) { // 判断路径文件夹是否存在
        return true

    } else { // 文件夹不存在
        if ( mkdirs(path.dirname(dirname)) ) { // 回调递归
            fs.mkdirSync(dirname);
            return true
        }
    }
}

let createFiles =  (userId, type = 'images') => { // 创建文件夹
    // 创建用户及日期文件夹
    log(4, `创建文件夹 userId: ${userId}; type: ${type}`);
    let user = userId;
    let date = new Date();
    let dirName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let rootName = `CrossMediaExtension\\upfiles\\${user}\\${type}\\`;
    
    log(3, "创建文件夹");
    mkdirs(`${rootName}${dirName}\\`);
    log(3, "创建完成!");

    return {
            "local_path": `${rootName}${dirName}\\`, 
            "web_path": `http://${server.hostname}/${server.host}/${user}/${type}/${dirName}/`
        } 
}

let createFile = (path, data, code = 'base64') => { // 写入文件
    log(4, `写入文件 path: ${path}; dataType: ${typeof data} code: ${code}`);
    if (code == 'base64') {
        let Data = new Buffer(data, 'base64');
    } else {
        let Data = data;
    }

    return new Promise(resolve => { 
        fs.writeFile(path, Data, code, err => {
            if (err) {
                log(0, `文件写入失败！ ${err}`);
                resolve(false);
            } else {
                log(3, `文件写入成功！`);
                resolve(true);
            }
        });
    });
}

exports.createFiles = createFiles
exports.createFile = createFile