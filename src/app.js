'use strict';

let path = require('path');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compression = require('compression');
let morgan = require('morgan');

let loggerService = require('services/loggerService');
let config = require('config/envConfig');

let app = express();

let router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

if(config.isLocal){
	app.use(morgan('dev', {
		skip: function(req, res){ return res.statusCode < 400 }
	}));
	app.use(express.static(path.join(__dirname, "public")));
} else {
	app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));
	app.use(express.static(path.join(__dirname, "..", "dist"), {
		maxAge: 60 * 60 * 24 * 365 * 1000
	}));
}

router.get("/aaa", (req, res, next) => {
	res.send("sdfsdfsdfds");
});

app.use(router);

module.exports = app;