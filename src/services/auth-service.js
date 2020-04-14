"use strict";
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = async (req, res, next) => {
  return await processAuthorize(req, res, next, false);
};

exports.authorizeOnlyAdmin = async (req, res, next) => {
  return await processAuthorize(req, res, next, true);
};

const processAuthorize = async (req, res, next, onlyAdmin) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({ status: 401, message: "Acesso Restrito." });
  } else {
    let result = undefined;
    await jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res
          .status(401)
          .json({ status: 401, message: "Token inválido ou expirado." });
      } else {
        if (onlyAdmin && !decoded.user_admin) {
          res.status(403).json({ status: 403, message: "Acesso Restrito[2]." });
          return;
        }

        if (!next) {
          result = {
            username: decoded.username,
            user_admin: decoded.user_admin,
          };
        } else {
          next();
        }
      }
    });
    return result;
  }
};

exports.encodeToBase64 = async (pwd) => {
  const buff = new Buffer(pwd);
  return buff.toString("base64");
};

exports.decodeBase64 = async (base64) => {
  const buff = new Buffer(base64, "base64");
  return buff.toString("ascii");
};
