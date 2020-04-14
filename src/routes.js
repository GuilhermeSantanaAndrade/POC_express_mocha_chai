const routes = require("express").Router();
const controllerCustomer = require("./controllers/controllerCustomers");

routes.get("/customers", controllerCustomer.listAll);
routes.get("/customers/:id", controllerCustomer.listOne);
routes.post("/customers", controllerCustomer.create);
routes.put("/customers/:id?", controllerCustomer.update);
routes.delete("/customers/:id?", controllerCustomer.delete);

module.exports.routes = routes;
module.exports.handle404 = function (req, res, next) {
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
};
