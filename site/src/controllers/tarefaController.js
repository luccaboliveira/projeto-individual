var tarefaModel = require("../models/tarefaModel");
// var aquarioModel = require("../models/aquarioModel");

function listarPet(req, res){
    var fkUsuario = req.body.fkUsuarioServer;

  tarefaModel.listarPet(fkUsuario)
  
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os pets: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });

}

function procurarTarefaPorDono(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

    if (fkUsuario == undefined) {
        res.status(400).send("A fkUsuario está indefinida!");
    } else {
        tarefaModel.procurarTarefaPorDono(fkUsuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length > 0) {
                        res.json({
                            id_tarefa: resultadoAutenticar[0].id_tarefa,
                            categoria: resultadoAutenticar[0].categoria,
                            descricao: resultadoAutenticar[0].descricao,
                            data_final: resultadoAutenticar[0].data_final,
                            nome: resultadoAutenticar[0].nome,
                            status_atual: resultadoAutenticar[0].status_atual
                        });
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

module.exports = {
    procurarTarefaPorDono,
    listarPet
}