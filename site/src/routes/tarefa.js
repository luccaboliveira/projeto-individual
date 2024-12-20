var express = require("express");
var router = express.Router();

var tarefaController = require("../controllers/tarefaController");

router.post("/adicionarTarefa", function (req, res) {
    tarefaController.adicionarTarefa(req, res);
})

router.post("/listarTarefa", function (req, res) {
    tarefaController.listarTarefa(req, res);
})

router.put("/atualizarStatus", function (req, res) {
    tarefaController.atualizarStatus(req, res);
})

router.get("/buscarQtdTarefa/:fkUsuario/:fkPet", function (req, res) {
    tarefaController.buscarQtdTarefa(req, res);
})

module.exports = router;