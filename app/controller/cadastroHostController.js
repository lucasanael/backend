
const cadastroHostController = require('../model/cadastroHostController');

exports.registrarHost = (req, res) => {
    if (!req.body.cpf || !req.body.nome || !req.body.email || !req.body.Sexo || !req.body.dataNasc || !req.body.senha) {
        res.status(400).send({ message: 'Dados incompletos!' }); //

        return;
    }
    cadastroHostController.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao cadastrar usuário'
            });
        } else {
            res.status(201).send({ message: 'Usuário criado com sucesso' });
        }
    });
};

