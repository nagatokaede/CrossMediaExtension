'use strict'

// 设置全局可变对象
// 
module.exports = {
    // node 服务信息
    server: {
         hostname: '192.168.1.3', 
         post: '2233'
    },
    // face++ API 接口信息
    faceInfo: {
        // 账户信息
        'api_key': 'AzKgAI2D8WwBHhkhob8L1SlmNGZ2RcQP', 
        'api_secret': 'o4Y9UCvImdvt5oZTBKdHWGQdCNcE_iXO',
        // 人脸识别
        // 是否检测并返回人脸关键点。合法值为：
        // 2   检测。返回 106 个人脸关键点。
        // 1   检测。返回 83 个人脸关键点。
        // 0   不检测
        'return_landmark': 0, 
        // 人脸融合
        // 融合比例，范围 [0,100]。数字越大融合结果包含越多融合图 (merge_url, merge_file, merge_base64 代表图片) 特征。
        'merge_rate': 80,
        // 美颜
        // 美白程度，取值范围[0,100] 0不美白，100代表最高程度，本参数默认值为 100 
        'whitening': 100, 
        // 磨皮程度，取值范围 [0,100] 0不磨皮，100代表最高程度，本参数默认值为 100
        'smoothing': 100
    }, 
    // 规定上传文件的格式
    UpFileType: ['image/jpg', 'image/jpeg', 'image/png']
}
