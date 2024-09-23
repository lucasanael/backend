const cadastroUsuario = require('../model/cadastroUsuarioModel');

exports.registrarUsuario = (req, res) => {
    if (!req.body.cpf || !req.body.Sexo || !req.body.nome || !req.body.telefone || !req.body.dataNasc || !req.body.email) {
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