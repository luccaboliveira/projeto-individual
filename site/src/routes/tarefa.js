var express = require("express");
var router = express.Router();

var tarefaController = require("../controllers/tarefaController");

router.post("/listarTarefa", function (req, res) {
    tarefaController.listarTarefa(req, res);
})

router.post("/listarPet", function (req, res) {
    tarefaController.listarPet(req, res);
})

module.exports = router;