'use strict'

const faceInfo = require('../../../setting').faceInfo;
const log = require('../../../debug/log').log;
const strToJson = require('../../../tools/typeConversion').strToJson;

const querystring = require('querystring');
const https = require('https');

let reqBeautifyAPI = (path, url) => {
    return new Promise(resolve => {
        // 设置 face++ 接口用户信息
        let faceInfoObj = new Object;
        faceInfoObj.api_key = faceInfo.api_key;
        faceInfoObj.api_secret = faceInfo.api_secret;
        faceInfoObj.whitening = faceInfo.whitening;
        faceInfoObj.smoothing = faceInfo.smoothing;
        faceInfoObj.image_url = url

        // 拼接 face++ API 接口信息
        let postData = querystring.stringify(faceInfoObj);

        // 设置请求头
        const options = {
            hostname: 'api-cn.faceplusplus.com', // 目标域名
            port: 443, // http 默认 80 端口， https 默认 443 端口
            path: '/facepp/beta/beautify', // 信息发往的路径
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
                log(4, '\n响应中已无数据。');
                // 返回美颜后数据
                let dataObj = strToJson(data);
                
                if (dataObj.error_message) {
                    log(0, `美颜请求发生错误: ${dataObj.error_message}`);
                    resolve(false);
                                     
                } else { // 成功请求并返回图像
                    log(3, `美颜完成！`);
                    resolve(dataObj);                    
                }
                
            });
        });

        req.on('error', (e) => {
            console.error(`美颜请求遇到问题: ${e.message}`);
            resolve(false);
        });

        // 写入数据到请求主体
        req.write(postData);

        req.end();
    });
}

module.exports = reqBeautifyAPI
