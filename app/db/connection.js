// Importa a classe Connection do módulo "tedious", que é usado para conectar ao SQL Server
const { Connection } = require("tedious");

// Importa as configurações de conexão ao banco de dados do arquivo config.js
const config = require("../config/config");

// Função para conectar ao banco de dados
async function connectDatabase() {
  // Retorna uma nova Promise para lidar com a operação assíncrona de conexão
  return new Promise((resolve, reject) => {
    // Cria uma nova instância de conexão com as configurações fornecidas
    const connection = new Connection(config);
    
    // Inicia a conexão com o banco de dados
    connection.connect((err) => {
      // Se houver um erro na conexão, a Promise será rejeitada com o erro
      if (err) reject(err);
      else {
        // Se a conexão for bem-sucedida, a Promise será resolvida com a instância da conexão
        resolve(connection);
      }
    });
  });
}

// Exporta a função connectDatabase para que possa ser utilizada em outras partes da aplicação
module.exports = connectDatabase;