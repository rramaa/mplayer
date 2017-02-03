'use strict';

let envConfig = {
	isLocal: (typeof process.env.NODE_ENV == "undefined" || process.env.NODE_ENV == "development" || process.env.NODE_ENV == "localhost") ? true : false,
	port: process.env.PORT
}

module.exports = envConfig;