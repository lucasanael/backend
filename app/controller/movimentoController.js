
const movimentoController = require('../model/movimentoController');

exports.listarTodos = (req, res) => {
    movimentoController.findAll((err, clientes) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar movimento'
            });
        } else {
            res.send(clientes);
        }
    });
};

exports.buscarPorCpf = (req, res) => {
    movimentoController.findByCpf(req.params.cpf, (err, cliente) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar movimento'
            });
        } else if (!cliente) {
            res.status(404).send({
                message: 'Movimento não encontrado'
            });
        } else {
            res.send(cliente);

        }
    });
};

exports.criar = (req, res) => {
    if (!req.body.RM || !req.body.Exemplar || !req.body.tipoEmprestimo || !req.body.dataEmprestimo) {
        res.status(400).send({ message: 'Dados incompletos!' }); //

        return;
    }
    movimentoController.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao registrar movimento'
            });
        } else {
            res.status(201).send({ message: 'Movimento criado com sucesso' });
        }
    });
};

exports.atualizar = (req, res) => {
    if (!req.body.RM || !req.body.Exemplar || !req.body.tipoEmprestimo || !req.body.dataEmprestimo) {
        res.status(400).send({ message: 'Dados incompletos para atualização!' });
        return;
    }
    movimentoController.update(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao atualizar movimento' });
        } else {
            res.status(200).send({ message: 'Movimento atualizado com sucesso' });
        }
    });
};

exports.excluir = (req, res) => {
    movimentoController.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao excluir movimento'
            });
        } else {
            res.status(200).send({ message: 'Movimento excluído com sucesso' });
        }
    });
};
