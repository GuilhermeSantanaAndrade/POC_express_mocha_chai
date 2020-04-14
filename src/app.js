const express = require("express");
const cors = require("cors");
const { routes, handle404 } = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handle404);

module.exports = app;
