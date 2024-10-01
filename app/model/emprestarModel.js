const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/connection");

// Função genérica para executar uma query SQL
async function executeQuery(query, params = []) {
  // Estabelece uma conexão com o banco de dados
  const connection = await connectDatabase();
  
  // Retorna uma Promise para lidar com a execução assíncrona da query
  return new Promise((resolve, reject) => {
    // Cria uma nova requisição SQL com a query passada e um callback para erros
    const request = new Request(query, (err) => {
      if (err) {
        // Se ocorrer um erro, a Promise é rejeitada e a conexão é fechada
        console.error(err);
        reject(err);
        connection.close();
      }
    });

    // Adiciona parâmetros à requisição SQL (nome, tipo e valor)
    params.forEach(({ name, type, value }) => {
      request.addParameter(name, type, value);
    });

    // Array para armazenar os resultados retornados pela query
    let results = [];

    // Evento "row" é disparado para cada linha retornada pela query
    request.on("row", (columns) => {
      // Cria um objeto para cada linha e armazena suas colunas e valores
      let row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });
      results.push(row);
    });

    // Evento "requestCompleted" é disparado quando a query é completamente executada
    request.on("requestCompleted", () => {
      // Fecha a conexão com o banco de dados e resolve a Promise com os resultados
      connection.close();
      resolve(results);
    });

    // Executa a requisição SQL
    connection.execSql(request);
  });
}


// Função para criar um novo usuário
async function registrarEmprestimo(RM, Título, CPF, Exemplar, dataEmprestimo, dataDevolucao) {
  const query = `INSERT INTO Empréstimo (RM, Título, CPF, Exemplar, dataEmprestimo, dataDevolucao) VALUES (@RM, @Título, @CPF, @Exemplar, @dataEmprestimo, @dataDevolucao);`;
  const params = [
    { name: "RM", type: TYPES.Int, value: RM },  
    { name: "Título", type: TYPES.VarChar, value: Título },  
    { name: "CPF", type: TYPES.VarChar, value: CPF },  
    { name: "Exemplar", type: TYPES.VarChar, value: Exemplar },  
    { name: "dataEmprestimo", type: TYPES.Date, value: dataEmprestimo },  
    { name: "dataDevolucao", type: TYPES.Date, value: dataDevolucao },  
    
  ];
  await executeQuery(query, params); 
}



// Exporta as funções para serem usadas nos controllers
module.exports = {
    registrarEmprestimo,
};