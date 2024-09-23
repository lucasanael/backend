
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

exports.findAll = (callback) => {
    const sql = "SELECT * FROM cadastroUsuario";
    executeSQL(sql, callback);
};

exports.findById = (cpf, callback) => {
    const sql = `SELECT * FROM cadastroUsuario WHERE CPF = ${cpf}`;
    executeSQL(sql, (err, cadastroUsuario) => {
        if (err) {
            callback(err, null);
        } else {

            const cadastroUsuario = cadastroUsuario.length > 0 ? cadastroUsuario[0] : null;
            callback(null, cadastroUsuario);
        }
    });
};

exports.create = (cadastroUsuario, callback) => {
    const sql = `INSERT INTO cadastroUsuario (sexo, nome, telefone, dataNasc, email) VALUES
('${cadastroUsuario.sexo}', '${cadastroUsuario.nome}', '${cadastroUsuario.telefone}', '${cadastroUsuario.dataNasc}', '${cadastroUsuario.email}')`;
    executeSQL(sql, callback);
};

exports.update = (cpf, cadastroUsuario, callback) => {
    const sql = `UPDATE cadastroUsuarios SET sexo = '${cadastroUsuario.sexo}', nome = '${cadastroUsuario.nome}', telefone = '${cadastroUsuario.telefone}', dataNasc =
'${cadastroUsuario.dataNasc}', email = '${cadastroUsuario.email}'  WHERE CPF =
${cpf}`;
    executeSQL(sql, callback);
};

exports.delete = (cpf, callback) => {
    const sql = `DELETE FROM cadastroUsuarios WHERE CPF = ${cpf}`;
    executeSQL(sql, callback);
};
