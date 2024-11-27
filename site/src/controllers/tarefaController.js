var tarefaModel = require("../models/tarefaModel");
// var aquarioModel = require("../models/aquarioModel");

function adicionarTarefa(req, res) {
    var fkPet = req.body.fkPetServer
    var fkUsuario = req.body.fkUsuarioServer
    var categoria = req.body.categoriaServer
    var descricao = req.body.descricaoServer
    var dataFinal = req.body.dataFinalServer

    if (fkPet == undefined) {
        res.status(400).send("A fkPet está indefinida!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("A fkUsuario está indefinida!");
    } else if (categoria == undefined) {
        res.status(400).send("A categoria está indefinida!");
    } else if (descricao == undefined) {
        res.status(400).send("A descricao está indefinida!");
    } else if (dataFinal == undefined) {
        res.status(400).send("A dataFinal está indefinida!");
    } else {
        tarefaModel.adicionarTarefa(fkPet, fkUsuario, categoria, descricao, dataFinal)

        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "\nHouve um erro ao cadastrar a tarefa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);  
                
            }
        )
    }

}

function listarTarefa(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

    if (fkUsuario == undefined) {
        res.status(400).send("A fkUsuario está indefinida!");
    } else {
        tarefaModel.listarTarefa(fkUsuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length > 0) {
                        res.json(resultadoAutenticar)

                    } else {
                        res.status(401).send("Nenhuma tarefa cadastrada!");
                    }

                }

            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao procurar a tarefa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function atualizarStatus(req, res) {
    var idTarefa = req.body.idTarefaServer;
    var statusAtual = req.body.statusAtualServer;

    if (idTarefa == undefined) {
        res.status(400).send("A idTarefa está indefinida!");
    } else if (statusAtual == undefined) {
        res.status(400).send("O statusAtual está indefinido!");

    } else {

        tarefaModel.atualizarStatus(idTarefa, statusAtual)
            .then(
                function (resultadoAtualizar) {
                    res.json(resultadoAtualizar)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao procurar a tarefa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function buscarQtdTarefa(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var fkPet = req.params.fkPet;

    console.log(`Buscando tarefas`);

    tarefaModel.buscarQtdTarefa(fkUsuario, fkPet)                                     
      .then(function (resultado) {                              
        if (resultado.length > 0) {                             
          console.log(resultado);                               
          res.status(200).json(resultado);                     
        } else {                                                
          res.status(204).send("Nenhum resultado encontrado!");
        }
      })
      .catch(function (erro) {                                             // CAPTURA qualquer erro ocorrido durante a execução da query para a busca dos votos
        console.log(erro);                                                 // exibe o JSON contendo as informações do erro ocorrido
        console.log("Houve um erro ao buscar as tarefas", erro.sqlMessage); // exibe a mensagem do erro ocorrido
        res.status(500).json(erro.sqlMessage);                             // retorna o status 500 (Erro) com a mensagem do erro ocorrido
      });
}
module.exports = {
    adicionarTarefa,
    listarTarefa,
    atualizarStatus,
    buscarQtdTarefa
}