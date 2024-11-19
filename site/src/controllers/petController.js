var petModel = require("../models/petModel")

function cadastrarPet(req, res) {
    var idUsuario = req.body.idUsuarioServer
    var nomePet = req.body.nomePetServer
    var dtNasc = req.body.dtNascServer
    var sexo = req.body.sexoServer
    var tipo = req.body.tipoServer

    if (nomePet == undefined) {
        res.status(400).send("O campo nomePet está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("O campo data de nascimento está undefined!");
    } else if (sexo == undefined) {
        res.status(400).send("O campo sexo está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("O campo tipo está undefined!");
    } else {
        petModel.cadastrarPet(idUsuario, nomePet, dtNasc, sexo, tipo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);  
                    
                }
            )
    }
}

module.exports = {
    cadastrarPet
}