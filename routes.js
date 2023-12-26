const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const cadastrarController = require("./src/controllers/cadastrarController");
const pagamentoController = require("./src/controllers/pagamentoController");
const relatorioController = require("./src/controllers/relatorioController");
const tabelaController = require("./src/controllers/tabelaController");

route.get("/",homeController.index);
route.get("/home",homeController.home);
route.post("/cadastrar/register", cadastrarController.cadastrar);
route.get("/pagamento/:placaCarro", pagamentoController.index);
route.post("/pagamento/realizado", pagamentoController.pago);
route.get("/relatorio", relatorioController.index);
route.get("/tabela", tabelaController.index);

module.exports = route;
