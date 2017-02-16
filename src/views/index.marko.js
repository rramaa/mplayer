function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<html><body><input type=\"text\"><button>" +
      escapeXml(data.buttonText) +
      "</button></body><script src=\"/socket.io/socket.io.js\" type=\"text/javascript\"></script><script src=\"/socket.io-stream.js\" type=\"text/javascript\"></script></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
