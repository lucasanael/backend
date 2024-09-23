const livros = require('../model/livroModel');
exports.listarTodos = (req, res) => {
    livros.findAll((err, livros) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar livro'

            });
        } else {
            res.send(livros);

        }
    });
};

exports.buscarPorId = (req, res) => {
    livros.findById(req.params.id, (err, livro) => {
        if (err) {

            res.status(500).send({
                message: 'Erro ao buscar livro'

            });
        } else if (!livro) {
            res.status(404).send({
                message: 'Livro não encontrado'
            });
        } else {
            res.send(livro);


        }
    });
};

exports.criar = (req, res) => {
    if (!req.body.exemplar || !req.body.nomeAutor || !req.body.titulo || !req.body.assunto || !req.body.nChamada || !req.body.acervo || !req.body.isbn || !req.body.quantidade || !req.body.situcao) {
        res.status(400).send({ message: 'Dados incompletos!' }); //

        return;
    }
    livros.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao procurar livro'

            });
        } else {
            res.status(201).send({ message: 'Livro encontrado com sucesso' });
        }
    });
};

exports.atualizar = (req, res) => {
    if (!req.body.exemplar || !req.body.nomeAutor || !req.body.titulo || !req.body.assunto || !req.body.nChamada || !req.body.acervo || !req.body.isbn || !req.body.quantidade || !req.body.situcao) {
        res.status(400).send({ message: 'Dados incompletos para encontrar o livro!' });
        return;
    }
    livros.update(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao procurar livro' });
        } else {

            res.status(200).send({ message: 'Livro encontrado' });
        }
    });
};

exports.excluir = (req, res) => {
    cadastroUsuario.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Erro ao buscar livro'

            });
        } else {
            res.status(200).send({ message: 'Livro encontrado' });
        }
    });
};