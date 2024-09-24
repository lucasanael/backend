const livros = require('../model/livrosModel');

exports.buscarPorExemplar = (req, res) => {
    livros.findByExemplar(req.params.Exemplar, (err, livro) => {
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

exports.registrarAcervo = (req, res) => {
    if (!req.body.Exemplar || !req.body.nomeAutor || !req.body.titulo || !req.body.assunto || !req.body.nChamada || !req.body.acervo || !req.body.isbn || !req.body.quantidade || !req.body.situacao) {
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


exports.atualizarAcervo = (req, res) => {
    if (!req.body.Exemplar || !req.body.nomeAutor || !req.body.titulo || !req.body.assunto || !req.body.nChamada || !req.body.acervo || !req.body.isbn || !req.body.quantidade || !req.body.situacao) {
        res.status(400).send({ message: 'Dados incompletos para encontrar o livro!' });
        return;
    }
    livros.update(req.params.Exemplar, req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao procurar livro' });
        } else {

            res.status(200).send({ message: 'Livro encontrado' });
        }
    });
};
