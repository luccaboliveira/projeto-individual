var express = require("express");
var router = express.Router();

var petController = require("../controllers/petController");

router.post("/cadastrarPet", function (req, res) {
    petController.cadastrarPet(req, res);
});

router.post("/listarPet", function (req, res) {
    petController.listarPet(req, res);
})

module.exports = router;