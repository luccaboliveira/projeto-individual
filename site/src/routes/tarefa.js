var express = require("express");
var router = express.Router();

var tarefaController = require("../controllers/tarefaController");

router.post("/procurarTarefaPorDono", function (req, res) {
    tarefaController.procurarTarefaPorDono(req, res);
})

router.post("/listarPet", function (req, res) {
    tarefaController.listarPet(req, res);
})

module.exports = router;