const { Request, TYPES } = require("tedious");

const connectDatabase = require("../db/connection");

async function executeQuery(query, params = []) {

    const connection = await connectDatabase();


    return new Promise((resolve, reject) => {

        const request = new Request(query, (err) => {
            if (err) {

                reject(err);
                connection.close();
            }
        });

        params.forEach(({ name, type, value }) => {
            request.addParameter(name, type, value);
        });

        let results = [];


        request.on("row", (columns) => {

            let row = {};
            columns.forEach((column) => {
                row[column.metadata.colName] = column.value;
            });
            results.push(row);
        });


        request.on("requestCompleted", () => {

            connection.close();
            resolve(results);
        });


        connection.execSql(request);
    });
}

async function getAlunobyRm(rm) {
    const query = "SELECT * FROM Alunos WHERE RM = @RM;";
    const params = [{ name: "RM", type: TYPES.Int, value: rm }];
    const users = await executeQuery(query, params);
    return users.length > 0 ? users[0] : null;
}



module.exports = {
    getAlunobyRm
};