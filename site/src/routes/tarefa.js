var express = require("express");
var router = express.Router();

var tarefaController = require("../controllers/tarefaController");

router.post("/listarTarefa", function (req, res) {
    tarefaController.listarTarefa(req, res);
})

router.post("/listarPet", function (req, res) {
    tarefaController.listarPet(req, res);
})

router.put("/atualizarStatus", function (req, res) {
    tarefaController.atualizarStatus(req, res);
})

module.exports = router;