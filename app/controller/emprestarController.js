const userModel = require("../model/emprestarModel");



// Função para criar um novo usuário
async function registrarEmprestimo(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const { RM,  CPF, Exemplar, dataEmprestimo, dataDevolucao } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecExemplaros
    await userModel.registrarEmprestimo(RM,  CPF, Exemplar, dataEmprestimo, dataDevolucao);
  
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Empréstimo criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o Empréstimo");
  }
}
async function deletarEmprestimo(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const Exemplar = req.params.Exemplar;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecExemplaros
    await userModel.deletarEmprestimo(Exemplar);
  
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Emprestimo deletado com sucesso!");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar emprestimo");
  }
}


module.exports = {
    registrarEmprestimo,
    deletarEmprestimo

};