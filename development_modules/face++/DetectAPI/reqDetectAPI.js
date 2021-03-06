'use strict'

const faceInfo = require('../../../setting').faceInfo;
const log = require('../../../debug/log').log;
const strToJson = require('../../../tools/typeConversion').strToJson;

const querystring = require('querystring');
const https = require('https');

let reqDetectAPI = (path) => {
    return new Promise((resolve, reject) => {
        // 设置 face++ 接口用户信息
        let faceInfoObj = new Object;
        faceInfoObj.api_key = faceInfo.api_key;
        faceInfoObj.api_secret = faceInfo.api_secret;
        faceInfoObj.return_landmark = faceInfo.return_landmark;
        faceInfoObj.image_url = path
        
        // 拼接 face++ API 接口信息
        let postData = querystring.stringify(faceInfoObj);

        // 设置请求头
        const options = {
            hostname: 'api-cn.faceplusplus.com', // 目标域名
            port: 443, // http 默认 80 端口， https 默认 443 端口
            path: '/facepp/v3/detect', // 信息发往的路径
            method: 'POST', 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded', 
                'COntent-Length': Buffer.byteLength(postData)
            }
        };
        // 回调函数返回信息并调用处理方法
        const req = https.request(options, (res) => {
            let data = '';
            log(4, `状态码：\n${res.statusCode}`);
            log(4, `请求头：\n${res.headers}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                process.stdout.write("*");
                data += chunk;
            });

            res.on('end', () => {
                log(4, '响应中已无数据。');
                // 仅返回人脸框数据
                let dataObj = strToJson(data);
                
                if (dataObj.error_message) {
                    log(0, `人脸识别请求发生错误！${dataObj.error_message}`);
                    resolve(false);
                    
                } else if (!dataObj.faces[0]) {
                    log(1, `上传图像中未能找到人脸信息!`);
                    resolve(undefined);
                    
                } else { // 成功请求并返回人脸信息
                    resolve(dataObj.faces);
                }
                
            });
        });

        req.on('error', (e) => {
            console.error(`人脸识别请求遇到问题: ${e.message}`);
            resolve(false);
        });

        // 写入数据到请求主体
        req.write(postData);

        req.end();
    });
}

module.exports = reqDetectAPI
