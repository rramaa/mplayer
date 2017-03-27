'use strict';

const marko = require('marko'),
    path = require('path'),
    logger = require('services/loggerService');


module.exports.setup = function(app) {
};


function _setTemplateData(res) {
}

function _groupFooters(footerObj) {
}

function _setHeaders(res, contentType) {
}


module.exports.loadTemplate = function(moduleDir, templatePath = '') {

    let re = new RegExp("^([a-zA-Z0-9-/.]+.marko)");
    let filePath;

    if (re.test(templatePath)) {
        filePath = path.resolve(path.join(moduleDir, templatePath));
    } else {
        filePath = path.resolve(path.join(moduleDir, templatePath, '/view.marko'));
    }

    const template = marko.load(filePath);

    if (!template.renderOriginal) {
        template.renderOriginal = template.render;
        template.renderAsync = function(data, res, contentType, req) {
            try {
                if (typeof callback === 'function') {
                    return template.renderOriginal(data, callback);
                }
                return template.renderOriginal(data, res);
            } catch (ex) {
                console.log(ex.stack);
                return res.send(ex.message);
            }
        };
    }

    return template;
};
