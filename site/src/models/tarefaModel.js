var database = require("../database/config")

function adicionarTarefa(fkPet, fkUsuario, categoria, descricao, dataFinal) {
    var instrucaoSql = `
    INSERT INTO tarefa (fk_pet, fk_usuario, categoria, descricao, data_final, status_atual) VALUES
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

function buscarQtdTarefa(fkPet, fkUsuario) {
    var instrucaoSql = `
    SELECT 
    (SELECT max(qtdTarefa) FROM (SELECT COUNT(fk_pet) AS qtdTarefa FROM tarefa WHERE fk_usuario = ${fkUsuario} GROUP BY FK_PET) AS qtdTotal) AS maiorQtd,
    (SELECT min(qtdTarefa) FROM (SELECT COUNT(fk_pet) AS qtdTarefa FROM tarefa WHERE fk_usuario = ${fkUsuario} GROUP BY FK_PET) AS qtdTotal) AS menorQtd,
    (SELECT count(fk_pet) FROM tarefa WHERE status_atual = 'Pendente' AND fk_usuario = ${fkUsuario}) AS qtdPendente, 
    (SELECT count(fk_pet) FROM tarefa WHERE status_atual = 'Concluído' AND fk_usuario = ${fkUsuario}) AS qtdConcluido,
    (SELECT count(fk_pet) WHERE tarefa.fk_usuario = ${fkUsuario}) AS qtdTarefa,
    (SELECT count(id_tarefa) from tarefa WHERE tarefa.fk_usuario = ${fkUsuario}) AS qtdTotal,
    fk_pet, nome
    FROM tarefa JOIN pet ON fk_pet = id_pet
    WHERE tarefa.fk_usuario = ${fkUsuario}
    GROUP BY tarefa.fk_pet, nome;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarTarefa,
    listarTarefa,
    atualizarStatus,
    buscarQtdTarefa
};