'use strict';

let routeConfig = require('config/routeConfig');
let utilService = require('services/utilService');
let path = require('path');
let _ = utilService._;

let errorModules = {
	"404":{
		template: require('services/templateLoader').loadTemplate(path.join(__dirname, "..", "modules", routeConfig.errorRoutes["404"].module))
	},
	"500":{
		template: require('services/templateLoader').loadTemplate(path.join(__dirname, "..", "modules", routeConfig.errorRoutes["500"].module))
	}
}

module.exports.setup = function(app){
	for(let routes of routeConfig.mainRoutes){
		let modulePath = path.join("modules", routes.module, "controller");
		let module = require(modulePath);
		_.forEach(routes.method, (v) => {
			app[v](routes.route, module[v]);
		})
	}

	app.use((req, res, next) => {
		let error = new Error();
		error.status = 404;
		next(error);
	})

	app.use((error, req, res, next) => {
		if(!error.status){
			error.status = 500;
		}
		res.status(error.status);
		if(error.status == 404){
			errorModules[404].template.renderAsync({}, res);
		} else {
			errorModules[500].template.renderAsync({}, res);
		}
	})
}