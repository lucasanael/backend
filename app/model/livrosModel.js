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

// Função para obter um usuário pelo ID
async function buscarPorExemplar(Exemplar) {
  const query = "SELECT * FROM Livros WHERE Exemplar = @Exemplar;";  // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "Exemplar", type: TYPES.VarChar, value: Exemplar }];  // Define o parâmetro @id para ser passado na query
  const users = await executeQuery(query, params);  // Executa a query com os parâmetros
  return users.length > 0 ? users[0] : null;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}

// Função para criar um novo usuário
async function registrarAcervo(Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Quantidade, Situacao) {
  const query = `INSERT INTO Livros (Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Quantidade, Situacao) VALUES (@Exemplar, @Autor, @Título,  @Assunto, @nChamada, @Acervo,  @ISBN,  @Quantidade,  @Situacao);`;
  const params = [
    { name: "Exemplar", type: TYPES.VarChar, value: Exemplar },  
    { name: "Autor", type: TYPES.VarChar, value: Autor }, 
    { name: "Título", type: TYPES.VarChar, value: Título }, 
    { name: "Assunto", type: TYPES.VarChar, value: Assunto },
    { name: "nChamada", type: TYPES.VarChar, value: nChamada },
    { name: "Acervo", type: TYPES.VarChar, value: Acervo },  
    { name: "ISBN", type: TYPES.VarChar, value: ISBN },  
    { name: "Quantidade", type: TYPES.Int, value: Quantidade }, 
    { name: "Situacao", type: TYPES.VarChar, value: Situacao }, 
  ];
  await executeQuery(query, params); 
}


async function atualizarAcervo(Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Quantidade, Situacao) {
const query = `UPDATE Livros SET Autor = @Autor, Título = @Título, Assunto = @Assunto, nChamada = @nChamada, Acervo = @Acervo, ISBN = @ISBN, Quantidade = @Quantidade, Situacao = @Situacao WHERE Exemplar = @Exemplar`

  const params = [
    { name: "Exemplar", type: TYPES.VarChar, value: Exemplar },  
    { name: "Autor", type: TYPES.VarChar, value: Autor }, 
    { name: "Título", type: TYPES.VarChar, value: Título }, 
    { name: "Assunto", type: TYPES.VarChar, value: Assunto }, 
    { name: "nChamada", type: TYPES.VarChar, value: nChamada }, 
    { name: "Acervo", type: TYPES.VarChar, value: Acervo },  
    { name: "ISBN", type: TYPES.VarChar, value: ISBN },  
    { name: "Quantidade", type: TYPES.Int, value: Quantidade }, 
    { name: "Situacao", type: TYPES.VarChar, value: Situacao }, 
  ];
  await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  buscarPorExemplar,
  registrarAcervo,
  atualizarAcervo,
};