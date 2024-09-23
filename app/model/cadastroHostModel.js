
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
        let cadastroHost = [];
        request.on('row', columns => {
            let cadastroHost = {};
            columns.forEach(column => {
                cadastroHost[column.metadata.colName] = column.value;
            });
            cadastroHost.push(cadastroHost);
        });
        request.on('requestCompleted', () => {
            callback(null, cadastroHost);
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
    const sql = "SELECT * FROM cadastroHost";
    executeSQL(sql, callback);
};

exports.findById = (cpf, callback) => {
    const sql = `SELECT * FROM cadastroHost WHERE CPF = ${cpf}`;
    executeSQL(sql, (err, cadastroHost) => {
        if (err) {
            callback(err, null);
        } else {

            const cadastroHost = cadastroHost.length > 0 ? cadastroHost[0] : null;
            callback(null, cadastroHost);
        }
    });
};

exports.create = (cadastroHost, callback) => {
    const sql = `INSERT INTO cadastroHost (nome, email, sexo, dataNasc, senha) VALUES
('${cadastroHost.nome}', '${cadastroHost.email}', '${cadastroHost.sexo}', '${cadastroHost.dataNasc}', '${cadastroHost.senha}')`;
    executeSQL(sql, callback);
};

exports.update = (cpf, cadastroHost, callback) => {
    const sql = `UPDATE cadastroHost SET nome = '${cadastroHost.nome}', email = '${cadastroHost.email}', sexo = '${cadastroHost.sexo}', dataNasc =
'${cadastroHost.dataNasc}', senha = '${cadastroHost.senha}'  WHERE CPF =
${cpf}`;
    executeSQL(sql, callback);
};

exports.delete = (cpf, callback) => {
    const sql = `DELETE FROM cadastroHost WHERE CPF = ${cpf}`;
    executeSQL(sql, callback);
};
