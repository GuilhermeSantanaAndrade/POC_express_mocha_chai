const connection = require("../database/connection");
const { v4 } = require("uuid");
const {
  prepareSuccess200,
  throwError,
  throwRefuse401,
} = require("../helpers/responses_struct");
const { dateToMoment, inputDateToMoment } = require("../helpers/functions");

class controllerCustomer {
  listAll = async (req, res) => {
    try {
      const result = await connection("customers").select("*");
      res.json(prepareSuccess200(result));
    } catch (error) {
      throwError(res, error);
    }
  };

  listOne = async (req, res) => {
    try {
      let { guid } = req.params;

      const result = await connection("customers")
        .select("*")
        .where({ guid: guid });
      res.json(prepareSuccess200(result));
    } catch (error) {
      throwError(res, error);
    }
  };

  create = async (req, res) => {
    try {
      let { name, birthday, email, password, cel, whatsapp } = req.body;

      let guid = v4();

      const [result] = await connection("customers").insert({
        created_at: dateToMoment(new Date()),
        updated_at: dateToMoment(new Date()),
        guid: guid,
        name: name,
        birthday: inputDateToMoment(birthday),
        email: email,
        password: password,
        cel: cel,
        whatsapp: whatsapp,
      });

      res.json(
        prepareSuccess200({
          id: result,
          guid: guid,
        })
      );
    } catch (error) {
      throwError(res, error);
    }
  };

  update = async (req, res) => {
    try {
      let { id, guid, name, birthday, cel, whatsapp } = req.body;

      if (!guid && req.params) {
        guid = req.params.guid;
      }

      if (!guid && !id) {
        throwRefuse401(res, "Não foi informado 'guid' ou 'id' na requisição.");
        return;
      }

      let where = {};

      if (id) {
        where = {
          id: id,
        };
      } else {
        where = {
          guid: guid,
        };
      }

      const result = await connection("customers")
        .update({
          updated_at: dateToMoment(new Date()),
          guid: guid,
          name: name,
          birthday: inputDateToMoment(birthday),
          cel: cel,
          whatsapp: whatsapp,
        })
        .where(where);

      res.json(
        prepareSuccess200({
          updatedRecs: result,
          guid: guid,
        })
      );
    } catch (error) {
      throwError(res, error);
    }
  };

  delete = async (req, res) => {
    try {
      let { guid, id } = req.body;

      if (!guid && req.params) {
        guid = req.params.guid;
      }

      if (!guid && !id) {
        throwRefuse401(res, "Não foi informado 'guid' ou 'id' na requisição.");
        return;
      }

      let where = {};

      if (id) {
        where = {
          id: id,
        };
      } else {
        where = {
          guid: guid,
        };
      }

      const result = await connection("customers").delete().where(where);

      res.json(
        prepareSuccess200({
          deletedRecs: result,
          guid: guid,
        })
      );
    } catch (error) {
      throwError(res, error);
    }
  };
}

module.exports = new controllerCustomer();
