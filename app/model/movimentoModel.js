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
        let movimentos = [];
        request.on('row', columns => {
            let movimento = {};
            columns.forEach(column => {
                movimento[column.metadata.colName] = column.value;
            });
            movimentos.push(movimento);
        });
        request.on('requestCompleted', () => {
            callback(null, movimentos);
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
    const sql = "SELECT * FROM Movimentos";
    executeSQL(sql, callback);
};

exports.findById = (id, callback) => {
    const sql = `SELECT * FROM Movimentos WHERE ID = ${id}`;
    executeSQL(sql, (err, movimentos) => {
        if (err) {
            callback(err, null);
        } else {


            const movimento = movimentos.length > 0 ? movimentos[0] : null;
            callback(null, movimento);
        }
    });
};

exports.create = (movimento, callback) => {
    const sql = `INSERT INTO Movimentos (id, rm, exemplar,tipoMovimento, dataEmprestimo) VALUES
('${movimento.id}', '${movimento.rm}', '${movimento.exemplar}', '${movimento.tipoMovimento}', '${movimento.dataEmprestimo}')`;
    executeSQL(sql, callback);
};

exports.update = (id, movimento, callback) => {
    const sql = `UPDATE Movimentos SET id = '${movimento.id}', rm =
'${movimento.rm}', exemplar = '${movimento.exemplar}', tipoMovimento = '${movimento.tipoMovimento}', '${movimento.dataEmprestimo}' WHERE ID =
${id}`;
    executeSQL(sql, callback);
};

exports.delete = (id, callback) => {
    const sql = `DELETE FROM Movimentos WHERE ID = ${id}`;
    executeSQL(sql, callback);
};

