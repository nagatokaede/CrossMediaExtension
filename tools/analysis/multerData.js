'use strict'

/*
 * multer 数据处理
 */
const log = require('../../debug/log').log;
const server = require('../../setting').server;
const path = require('path');


module.exports = ctx => {
 	let file = ctx.req.files[0]

	let path_list = (file.path).split("\\");
	let web_url = `http://${server.hostname}/${server.host}/${path_list[2]}/${path_list[3]}/${path_list[4]}/${path_list[5]}`

	return {
        "filename": file.filename, 
        "path": path.dirname(file.path),
        "web_url": web_url,
        "mimetype": path.mimetype
    }
 }