var database = require("../database/config")

function cadastrarPet(idUsuario, nomePet, dtNasc, sexo, tipo){
    console.log("ACESSEI O PET MODEL")

    var instrucaoSql = `
        INSERT INTO pet (fk_usuario, nome, dt_nasc, sexo, tipo) VALUES (${idUsuario}, '${nomePet}', '${dtNasc}', '${sexo}', '${tipo}');
    `
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPet(fkUsuario) {
    var instrucaoSql = `
    SELECT id_pet, nome, tipo FROM pet 
	    WHERE fk_usuario = ${fkUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarPet,
    listarPet
}