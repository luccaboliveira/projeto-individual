var express = require("express");
var router = express.Router();

var petController = require("../controllers/petController");

router.post("/cadastrarPet", function (req, res) {
    petController.cadastrarPet(req, res);
});

module.exports = router;