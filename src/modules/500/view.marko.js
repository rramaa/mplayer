function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<this is a test file for 404 and 500></this>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
