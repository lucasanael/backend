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


async function createColaborador(cpf, Sexo, name, telefone, dataNasc, email) {
  const query = `INSERT INTO cadastroColaborador (cpf, Sexo, nome, telefone, dataNasc, email) VALUES (@cpf, @Sexo, @nome, @telefone, @dataNasc, @email);`;  
  const params = [
    { name: "cpf", type: TYPES.VarChar, value: cpf},
    { name: "Sexo", type: TYPES.Char, value: Sexo },  
    { name: "nome", type: TYPES.VarChar, value: name },  
    { name: "telefone", type: TYPES.VarChar, value: telefone },  
    { name: "dataNasc", type: TYPES.Date, value: dataNasc},
    { name: "email", type: TYPES.VarChar, value: email}
  ];
  await executeQuery(query, params); 
}

async function getColaboradorbyCPF(cpf) {
  const query = "SELECT * FROM cadastroColaborador WHERE cpf = @cpf;";
  const params = [{ name: "cpf", type: TYPES.VarChar, value: cpf }];
  const users = await executeQuery(query, params);
  return users.length > 0 ? users[0] : null;
}


module.exports = {
  createColaborador,
  getColaboradorbyCPF

};