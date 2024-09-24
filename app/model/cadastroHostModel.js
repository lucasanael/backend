
const { Connection, Request } = require('tedious');

const config = require('../config/config');

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

exports.registrarHost = (cadastroHost, callback) => {
    const sql = `INSERT INTO cadastroHost (nome, email, sexo, dataNasc, senha) VALUES
('${cadastroHost.cpf}', '${cadastroHost.nome}', '${cadastroHost.email}', '${cadastroHost.sexo}', '${cadastroHost.dataNasc}' , '${cadastroHost.senha}')`;
    executeSQL(sql, callback);
};