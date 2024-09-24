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
        let alunos = [];
        request.on('row', columns => {
            let aluno = {};
            columns.forEach(column => {
                aluno[column.metadata.colName] = column.value;
            });
            alunos.push(aluno);
        });
        request.on('requestCompleted', () => {
            callback(null, alunos);
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

exports.buscarPorRM = (RM, callback) => {
    const sql = `SELECT * FROM Alunos WHERE RM = ${RM}`;
    executeSQL(sql, (err, alunos) => {
        if (err) {
            callback(err, null);
        } else {


            const aluno = alunos.length > 0 ? alunos[0] : null;
            callback(null, aluno);
        }
    });
};