var database = require("../database/config")

function adicionarTarefa(fkPet, fkUsuario, categoria, descricao, dataFinal){
    var instrucaoSql = `
    INSERT INTO TAREFA (fk_pet, fk_usuario, categoria, descricao, data_final, status_atual) VALUES
    (${fkPet}, ${fkUsuario}, '${categoria}', '${descricao}', '${dataFinal}', 'Pendente');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function listarTarefa(fkUsuario) {
    var instrucaoSql = `
        select id_tarefa, categoria, descricao, data_final, p.nome, status_atual
	    FROM tarefa
	    JOIN pet AS p
		ON id_pet = fk_pet
			WHERE tarefa.fk_usuario = ${fkUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarStatus(idTarefa, statusAtual) {
    var instrucaoSql = `
        UPDATE tarefa 
        SET status_atual = '${statusAtual}'
        WHERE id_tarefa = ${idTarefa};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarTarefa,
    listarTarefa,
    atualizarStatus,
};