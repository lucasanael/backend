
const alunosController = require('../model/alunosModel.js');


exports.buscarPorRM = (req, res) => {
    alunosController.findByRM(req.params.rm, (err, aluno) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar Aluno'
            });
        } else if (!aluno) {
            res.status(404).send({
                message: 'Aluno não encontrado'
            });
        } else {
            res.send(aluno);

        }
    });
};

