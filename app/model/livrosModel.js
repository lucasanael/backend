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
async function registrarAcervo(Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao) {
  const query = `INSERT INTO Livros (Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao) VALUES (@Exemplar, @nomeAutor, @titulo,  @assunto,  @nChamada,  @acervo,  @isbn,  @quantidade,  @situacao);`;
  const params = [
    { name: "Exemplar", type: TYPES.VarChar, value: Exemplar },  
    { name: "nomeAutor", type: TYPES.VarChar, value: nomeAutor }, 
    { name: "titulo", type: TYPES.VarChar, value: titulo }, 
    { name: "assunto", type: TYPES.VarChar, value: assunto }, 
    { name: "nChamada", type: TYPES.VarChar, value: nChamada }, 
    { name: "acervo", type: TYPES.VarChar, value: acervo },  
    { name: "isbn", type: TYPES.Int, value: isbn },  
    { name: "quantidade", type: TYPES.Int, value: quantidade }, 
    { name: "situacao", type: TYPES.VarChar, value: situacao }, 
  ];
  await executeQuery(query, params); 
}


async function atualizarAcervo(Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao) {
const query = `UPDATE Livros SET nomeAutor = @nomeAutor, titulo = @titulo, assunto = @assunto, nChamada = @nChamada, acervo = @acervo, isbn = @isbn, quantidade = @quantidade, situacao = @situacao WHERE Exemplar = @Exemplar`

  const params = [
    { name: "Exemplar", type: TYPES.VarChar, value: Exemplar },  
    { name: "nomeAutor", type: TYPES.VarChar, value: nomeAutor }, 
    { name: "titulo", type: TYPES.VarChar, value: titulo }, 
    { name: "assunto", type: TYPES.VarChar, value: assunto }, 
    { name: "nChamada", type: TYPES.VarChar, value: nChamada }, 
    { name: "acervo", type: TYPES.VarChar, value: acervo },  
    { name: "isbn", type: TYPES.Int, value: isbn },  
    { name: "quantidade", type: TYPES.Int, value: quantidade }, 
    { name: "situacao", type: TYPES.VarChar, value: situacao }, 
  ];
  await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  buscarPorExemplar,
  registrarAcervo,
  atualizarAcervo
};