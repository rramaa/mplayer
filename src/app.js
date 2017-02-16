'use strict';

let path = require('path');
let http = require('http');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compression = require('compression');
let morgan = require('morgan');
require('marko/node-require').install();
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
	let chokidar = require('chokidar');
	let markoReload = require('marko/hot-reload');
	markoReload.enable();
	let watcher = chokidar.watch([path.join(__dirname, 'views')]);
	watcher.on('change', function(filename) {
	    if (/\.marko$/.test(filename)) {
	        // Resolve the filename to a full template path:
	        let templatePath = path.join(filename);
	        loggerService.info('Marko template modified: ', templatePath);
	        // Pass along the *full* template path to marko
	        markoReload.handleFileModified(templatePath);
	    }
	});
} else {
	app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));
	app.use(express.static(path.join(__dirname, "..", "dist"), {
		maxAge: 60 * 60 * 24 * 365 * 1000
	}));
}

router.get("/test", (req, res, next) => {
	let marko = require('marko');
	let template = marko.load(path.join(__dirname, 'views', 'index.marko'));
	template.render({buttonText: "test"}, res);
});

app.use(router);

module.exports = app;