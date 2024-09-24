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


async function createUsuario(cpf, Sexo, name, telefone, dataNasc, email) {
  const query = `INSERT INTO CadastroUsuario (cpf, Sexo, nome, telefone, dataNasc, email) VALUES (@cpf, @Sexo, @nome, @telefone, @dataNasc, @email);`;  
  const params = [
    { name: "cpf", type: TYPES.Int, value: cpf},
    { name: "Sexo", type: TYPES.NVarChar, value: Sexo },  
    { name: "nome", type: TYPES.NVarChar, value: name },  
    { name: "telefone", type: TYPES.NVarChar, value: telefone },  
    { name: "dataNasc", type: TYPES.NVarChar, value: dataNasc},
    { name: "email", type: TYPES.NVarChar, value: email}
  ];
  await executeQuery(query, params); 
}

module.exports = {
  createUsuario,

};