
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
        let cadastroUsuario = [];
        request.on('row', columns => {
            let cadastroUsuario = {};
            columns.forEach(column => {
                cadastroUsuario[column.metadata.colName] = column.value;
            });
            cadastroUsuarios.push(cadastroUsuario);
        });
        request.on('requestCompleted', () => {
            callback(null, cadastroUsuarios);
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

exports.registrarUsuario = (cadastroUsuario, callback) => {
    const sql = `INSERT INTO cadastroUsuario (cpf, Sexo, nome, telefone, dataNasc, email) VALUES
('${cadastroUsuario.cpf}', '${cadastroUsuario.Sexo}', '${cadastroUsuario.nome}', '${cadastroUsuario.telefone}', '${cadastroUsuario.dataNasc}', '${cadastroUsuario.email}')`;
    executeSQL(sql, callback);
};