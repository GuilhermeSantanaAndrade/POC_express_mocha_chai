module.exports.prepareSuccess200 = function(data) {
  return {
    status: 200,
    message: "OK",
    data: data
  };
};

module.exports.throwError = function(res, err) {
  const data = {
    status: 500,
    message: err.message || err
  };
  res.status(500).json(data);
};

module.exports.throwRefuse401 = function(res, msg) {
  const data = {
    status: 401,
    message: msg
  };
  res.status(401).json(data);
};
