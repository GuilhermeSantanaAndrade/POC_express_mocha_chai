global.AUTO_TEST = true;

const chai = require("chai");
const chaiHttp = require("chai-http");
const authService = require("../../src/services/auth-service.js");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Segurança", () => {
  it("Teste Unitário para Encode64", async () => {
    const result = await authService.encodeToBase64("ROOT");
    assert.equal(result, "Uk9PVA==");
  });

  it("Teste Unitário para Decode64", async () => {
    const result = await authService.decodeBase64("Uk9PVA==");
    assert.equal(result, "ROOT");
  });
});
