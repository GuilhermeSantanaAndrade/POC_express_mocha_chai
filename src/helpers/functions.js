const moment = require("moment");

module.exports.minMaxRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

module.exports.inputDateToMoment = function (strDate) {
  if (
    typeof strDate != "string" ||
    strDate.toString().length != 10 ||
    strDate.split("-").length != 3
  ) {
    throw Error("Parâmetro 'strDate' deve ser string no formato: dd-mm-yyyy");
  }

  let [dia, mes, ano] = strDate.split("-");

  let dt = new Date(`${mes}-${dia}-${ano}`);
  dt = moment(dt).format("YYYY-MM-DD HH:mm:ss");

  return dt;
};

module.exports.dateToMoment = function (dt) {
  if (typeof dt.getMonth != "function") {
    throw Error("Parâmetro 'date' deve ser do tipo Date");
  }

  return moment(dt).format("YYYY-MM-DD HH:mm:ss");
};
