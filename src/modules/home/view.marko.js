function create(__helpers) {
  var loadTemplate = __helpers.l,
      base_template = loadTemplate(require.resolve("templates/base.marko")),
      str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_use_tag = __loadTag(require("marko/taglibs/layout/use-tag")),
      layout_put_tag = __loadTag(require("marko/taglibs/layout/put-tag"));

  return function render(data, out) {
    layout_use_tag({
        __template: base_template,
        getContent: function getContent(__layoutHelper) {
          layout_put_tag({
              into: "body",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w("<input type=\"text\"><button>" +
                  escapeXml(data.buttonText) +
                  "</button>");
              }
            }, out);

          layout_put_tag({
              into: "scripts",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w("<script type=\"text/javascript\" src=\"/scripts/bundle.js\"></script>");
              }
            }, out);
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
