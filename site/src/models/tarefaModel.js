var database = require("../database/config")

function adicionarTarefa(fkPet, fkUsuario, categoria, descricao, dataFinal) {
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

function buscarQtdTarefa(fkPet, fkUsuario) {
    var instrucaoSql = `
    SELECT 
    (SELECT max(qtdTarefa) FROM (SELECT COUNT(fk_pet) AS qtdTarefa FROM tarefa WHERE tarefa.fk_usuario = ${fkUsuario} GROUP BY FK_PET) AS qtdTotal) as maiorQtd,
    (SELECT min(qtdTarefa) FROM (SELECT COUNT(fk_pet) AS qtdTarefa FROM tarefa WHERE tarefa.fk_usuario = ${fkUsuario} GROUP BY FK_PET) AS qtdTotal) as menorQtd,
    (SELECT count(fk_pet) from tarefa where status_atual = 'Pendente' AND fk_usuario = ${fkUsuario}) as qtdPendente, 
    (SELECT count(fk_pet) from tarefa where status_atual = 'Concluído' AND fk_usuario = ${fkUsuario}) as qtdConcluido,
    (SELECT count(fk_pet) WHERE tarefa.fk_usuario = ${fkUsuario}) AS qtdTarefa,
    fk_pet, nome, tipo
    FROM tarefa JOIN Pet ON fk_pet = id_pet
    WHERE tarefa.fk_usuario = ${fkUsuario}
    GROUP BY tarefa.FK_PET, pet.nome, pet.tipo;
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