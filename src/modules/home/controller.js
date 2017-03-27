
let template = require('services/templateLoader').loadTemplate(__dirname);

module.exports.get = function(req, res, next){
	template.renderAsync({buttonText: "dsf"}, res);
}