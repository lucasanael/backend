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


async function createHost(name, email, Sexo, dataNasc, senha) {
  const query = `INSERT INTO CadastroHost (nome, email, Sexo, dataNasc, senha) VALUES (@nome, @email, @Sexo, @dataNasc, @senha);`;  
  const params = [
    { name: "nome", type: TYPES.NVarChar, value: name },  
    { name: "email", type: TYPES.NVarChar, value: email },  
    { name: "Sexo", type: TYPES.NVarChar, value: Sexo },  
    { name: "dataNasc", type: TYPES.NVarChar, value: dataNasc},
    { name: "senha", type: TYPES.NVarChar, value: senha}
  ];
  await executeQuery(query, params); 
}

module.exports = {
  createHost,

};