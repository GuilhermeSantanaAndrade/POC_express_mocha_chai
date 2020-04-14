const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const authService = require("../../src/services/auth-service.js");
const connection = require("../../src/database/connection");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Customers", () => {
  before(async () => {
    // GET ACCESS-TOKEN FOR ALL TESTs
    const password = "ROOT";
    const encripted_password = await authService.encodeToBase64(password);

    const body = {
      username: "ROOT",
      key: encripted_password,
    };

    // const response = await chai
    //   .request(app)
    //   .post("/users/authenticate")
    //   .send(body);

    //const _token = JSON.parse(response.text).data.token;
    const _token = "SAEHDSKJAHDEJKSAHDJKHAJKSDA";
    global.AUTOTEST_ACCESS_TOKEN = _token;
  });

  beforeEach(async () => {
    await connection.migrate.latest();
  });

  after(async () => {
    await connection.destroy();
  });

  it("Devemos conseguir cadastrar um novo cliente e receber um status 200", async () => {
    try {
      const body = {
        name: "Teste",
        birthday: "14-03-1900",
        email: "teste@gmail.com",
        password: "",
        cel: "11999994444",
        whatsapp: "11999994444",
      };

      // Limpa tabela "customers"
      await connection("customers").delete();

      // Inclui um cliente
      const response = await chai
        .request(app)
        .post("/customers")
        .set("x-access-token", global.AUTOTEST_ACCESS_TOKEN)
        .send(body);

      // Verifica se retornou 200
      assert.equal(
        response.statusCode,
        200,
        `Não veio statusCode 200 (POST:/ambients) - ${
          JSON.parse(response.text).message
        }`
      );

      // Consulta no BD o cliente que acabou de ser incluído
      const finds = await connection("customers")
        .select("*")
        .where({ name: body.name });

      // Verifica se encontrou o cliente inserído
      assert.isNotEmpty(
        finds,
        "Após inclusão, não foi encontrado o cliente no BD."
      );
    } catch (err) {
      assert.fail(err);
    }
  });

  it("Devemos conseguir excluir um cliente", async () => {
    try {
      const body = {
        name: "Teste",
        birthday: "14-03-1900",
        email: "teste@gmail.com",
        password: "",
        cel: "11999994444",
        whatsapp: "11999994444",
      };

      // Limpa tabela "customers"
      await connection("customers").delete();

      // Chama rota de para inclusão de um cliente
      const responsePOST = await chai
        .request(app)
        .post("/customers")
        .set("x-access-token", global.AUTOTEST_ACCESS_TOKEN)
        .send(body);

      // Verifica se retornou 200
      assert.equal(
        responsePOST.statusCode,
        200,
        `Não veio statusCode 200 (POST:/customers) - ${
          JSON.parse(responsePOST.text).message
        }`
      );

      // Consulta no BD o cliente que acabou de ser incluído
      const findsPOST = await connection("customers")
        .select("*")
        .where({ name: body.name });

      // Verifica se encontrou o cliente inserído
      assert.isNotEmpty(
        findsPOST,
        "Após inclusão, não foi encontrado o cliente no BD."
      );

      // Chama rota para deleção do cliente que acabamos de incluir
      const responseDELETE = await chai
        .request(app)
        .delete("/customers")
        .set("x-access-token", global.AUTOTEST_ACCESS_TOKEN)
        .send({ id: JSON.parse(responsePOST.text).data.id });

      // Verifica se retornou 200
      assert.equal(
        responseDELETE.statusCode,
        200,
        `Não veio statusCode 200 (DELETE:/customers) - ${
          JSON.parse(responseDELETE.text).message
        }`
      );

      // Verifica se a propriedade deletedRecs retornou "1"
      assert.equal(
        JSON.parse(responseDELETE.text).data.deletedRecs,
        1,
        `Esperado que fosse retornado 1 registro deletado (DELETE:/customers) - ${
          JSON.parse(responseDELETE.text).message
        }`
      );

      // Consulta no BD o cliente que acabamos de deletar
      const findsDELETE = await connection("customers")
        .select("*")
        .where({ name: body.name });

      // Verifica se NÃO encontra mais o cliente
      assert.isEmpty(
        findsDELETE,
        "Após deleção, ainda foi encontrado o cliente no BD."
      );
    } catch (err) {
      assert.fail(err);
    }
  });
});
