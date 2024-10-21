
const userModel = require("../model/cadastroColaboradorModel");

async function createColaborador(req, res) {

    const { cpf, Sexo, nome, telefone, dataNasc, email } = req.body;
    
  try {

    await userModel.createColaborador(cpf, Sexo, nome, telefone, dataNasc, email);
    

    res.status(201).send("Usuário criado com sucesso");
  } catch (err) {

    console.error(err.message);
    res.status(500).send("Erro ao criar o usuário");
  }
}

async function getColaborador(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const cpfDoColaborador = req.params.cpf;

  console.log(`CPF do Colaborador: ${cpfDoColaborador}`); // Adicionei o log aqui
  
  try {
      // Chama o método do modelo para obter o usuário com base no ID fornecido
      const Colaborador = await userModel.getColaboradorbyCPF(cpfDoColaborador);

      // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
      if (!Colaborador) {
          res.status(404).send("Usuário não encontrado");
      } else {
          // Se o usuário for encontrado, retorna os dados em formato JSON
          res.json(Colaborador);
      }
  } catch (err) {
      // Exibe o erro no console e retorna uma resposta com status 500
      console.error(err.message);
      res.status(500).send("Erro ao obter o colaborador");
  }
}


module.exports = {
  createColaborador,
  getColaborador
  
};

