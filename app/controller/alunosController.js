
const alunosController = require('../models/alunoModel.js');

exports.listarTodos = (req, res) => {
    alunosController.findAll((err, alunos) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar alunos'
            });
        } else {
            res.send(alunos);
        }
    });
};

exports.buscarPorRm = (req, res) => {
    alunosController.findByCpf(req.params.rm, (err, aluno) => {
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

exports.criar = (req, res) => {
    if (!req.body.Rm || !req.body.Nome || !req.body.Sexo || !req.body.dataNasc || !req.body.Email) {
        res.status(400).send({ message: 'Dados incompletos!' }); //

        return;
    }
    alunosController.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao cadastrar Aluno'
            });
        } else {
            res.status(201).send({ message: 'Aluno criado com sucesso' });
        }
    });
};

exports.atualizar = (req, res) => {
    if (!req.body.Rm || !req.body.Nome || !req.body.Sexo || !req.body.dataNasc || !req.body.Email) {
        res.status(400).send({ message: 'Dados incompletos para atualização!' });
        return;
    }
    alunosController.update(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao atualizar cadastro' });
        } else {
            res.status(200).send({ message: 'Cadastro atualizado com sucesso' });
        }
    });
};

exports.excluir = (req, res) => {
    alunosController.delete(req.params.Rm, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao excluir cadastro'
            });
        } else {
            res.status(200).send({ message: 'Cadastro excluído com sucesso' });
        }
    });
};
