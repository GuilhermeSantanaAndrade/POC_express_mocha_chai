const knex = require("knex");
const configs = require("../../knexfile");

const ambient =
  process.env.NODE_ENV === "test" ? configs.test : configs.development;
const connection = knex(ambient);

module.exports = connection;
