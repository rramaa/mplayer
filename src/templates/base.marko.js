function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_placeholder_tag = __loadTag(require("marko/taglibs/layout/placeholder-tag"));

  return function render(data, out) {
    out.w("<html><body>");

    layout_placeholder_tag({
        name: "body",
        content: data.layoutContent
      }, out);

    out.w("</body>");

    layout_placeholder_tag({
        name: "scripts",
        content: data.layoutContent
      }, out);

    out.w("</html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
