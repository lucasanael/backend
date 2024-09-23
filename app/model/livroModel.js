const { Connection, Request } = require('tedious');
const config = require('../config/dbconfig');
function executeSQL(sql, callback) {
    const connection = new Connection(config);
    connection.on('connect', err => {
        if (err) {
            console.error('Erro de conexão:', err);
            callback(err, null);
            return;
        }
        const request = new Request(sql, (err, rowCount) => {
            if (err) {
                console.error('Erro ao executar a consulta:', err);
                return;
            }
            if (rowCount === 0) {

                callback(null, []);
                return;
            }
        });
        let livros = [];
        request.on('row', columns => {
            let livro = {};
            columns.forEach(column => {
                livro[column.metadata.colName] = column.value;
            });
            alunos.push(livro);
        });
        request.on('requestCompleted', () => {
            callback(null, livros);
        });
        request.on('error', err => {
            console.error('Erro durante a requisição:', err);
            callback(err, null);
        });
        request.on('done', () => {
            connection.close();

        });
        connection.execSql(request);
    });
    connection.connect();
}

exports.findAll = (callback) => {
    const sql = "SELECT * FROM Livros";
    executeSQL(sql, callback);
};

exports.findByExemplar = (exemplar, callback) => {
    const sql = `SELECT * FROM Livros WHERE EXEMPLAR = ${exemplar}`;
    executeSQL(sql, (err, livros) => {
        if (err) {
            callback(err, null);
        } else {


            const livro = livros.length > 0 ? livros[0] : null;
            callback(null, livro);
        }
    });
};

exports.create = (livro, callback) => {
    const sql = `INSERT INTO Livros (exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situcao) VALUES
('${livro.exemplar}', '${livro.nomeAutor}', '${livro.titulo}', '${livro.assunto}', '${livro.nChamada}', 
'${livro.acervo}', '${livro.isbn}', '${livro.quantidade}', '${livro.situcao}')`; executeSQL(sql, callback);
};

exports.update = (exemplar, livro, callback) => {
    const sql = `UPDATE Livros SET exemplar = '${livro.exemplar}', nomeAutor =
'${aluno.nomeAutor}', titulo = '${livro.titulo}', assunto = '${livro.assunto}', nChamada = '${livro.nChamada}',
 acervo = '${livro.acervo}', isbn = '${livro.isbn}', quantidade = '${livro.quantidade}', situação = '${livro.situcao}', WHERE EXEMPLAR =
${exemplar}`;
    executeSQL(sql, callback);
};

exports.delete = (exemplar, callback) => {
    const sql = `DELETE FROM Livros WHERE EXEMPLAR = ${exemplar}`;
    executeSQL(sql, callback);
};

