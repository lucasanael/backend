const cadastroUsuario = require('../model/cadastroUsuarioModel');
exports.listarTodos = (req, res) => {
    clienteModel.findAll((err, cadastroUsuario) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar cadastro de usuário'

            });
        } else {
            res.send(cadastroUsuario);

        }
    });
};

exports.buscarPorId = (req, res) => {
    cadastroUsuario.findById(req.params.id, (err, cadastroUsuario) => {
        if (err) {

            res.status(500).send({
                message: 'Erro ao buscar cadastro do usuário'

            });
        } else if (!cadastroUsuario) {
            res.status(404).send({
                message: 'Cadastro do usuário não encontrado'
            });
        } else {
            res.send(cadastroUsuario);


        }
    });
};

exports.criar = (req, res) => {
    if (!req.body.cpf || !req.body.sexo || !req.body.nome || !req.body.telefone || !req.body.dataNasc || !req.body.email) {
        res.status(400).send({ message: 'Dados incompletos!' }); //

        return;
    }
    cadastroUsuario.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao criar cadastro de usuário'

            });
        } else {
            res.status(201).send({ message: 'Cadastro criado com sucesso' });
        }
    });
};

exports.atualizar = (req, res) => {
    if (!req.body.cpf || !req.body.sexo || !req.body.nome || !req.body.telefone || !req.body.dataNasc || !req.body.email) {
        res.status(400).send({ message: 'Dados incompletos para cadastro!' });
        return;
    }
    cadastroUsuario.update(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao cadastrar usuário' });
        } else {

            res.status(200).send({ message: 'Usuário cadastrado com sucesso' });
        }
    });
};

exports.excluir = (req, res) => {
    cadastroUsuario.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao cadastrar usuário'

            });
        } else {
            res.status(200).send({ message: 'Usuário cadastrado com sucesso' });
        }
    });
};