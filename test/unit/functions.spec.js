global.AUTO_TEST = true;

const chai = require("chai");
const chaiHttp = require("chai-http");
const functions = require("../../src/helpers/functions.js");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Funções avulsas", () => {
  it("Teste Unitário para minMaxRandom", async () => {
    const result = await functions.minMaxRandom(0, 1000);
    assert.isNumber(result, "Não retornou um número em minMaxRandom");
    assert.isAtLeast(result, 0, "Não retornou um número positivo");
    assert.isAtMost(result, 1000, "Não retornou um número menor que 1000");
  });

  it("Teste Unitário para Decode64", async () => {
    const result = (10).pad(10);
    assert.equal(result, "0000000010");
  });
});
