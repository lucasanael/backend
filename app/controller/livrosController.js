const userModel = require("../model/livrosModel");


async function buscarPorExemplar(req, res) {
  // Extrai o Exemplar do usuário da requisição (usado na URL: /users/:Exemplar)
  const Exemplar = req.params.Exemplar;
  try {
    // Chama o método do modelo para obter o usuário com base no Exemplar fornecExemplaro
    const user = await userModel.buscarPorExemplar(Exemplar);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!user) {
      res.status(404).send("Usuário não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(user);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o usuário");
  }
}

// Função para criar um novo usuário
async function registrarAcervo(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
<<<<<<< HEAD
  const { Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Situacao, Quantidade } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecExemplaros
    await userModel.registrarAcervo(Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Situacao, Quantidade);
=======
  const { Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecExemplaros
    await userModel.createUser(Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao);
>>>>>>> e21b48f7f4b3127314de2be7f34b5a77150a58f7
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Usuário criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o usuário");
  }
}

// Função para atualizar um usuário existente
async function atualizarAcervo(req, res) {
  // Extrai o Exemplar do usuário da URL e os novos dados do corpo da requisição
  const Exemplar = req.params.Exemplar;
<<<<<<< HEAD
  const { Autor, Título, Assunto, nChamada, Acervo, ISBN, Quantidade, Situacao } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no Exemplar e nos dados fornecExemplaros
    await userModel.atualizarAcervo(Exemplar, Autor, Título, Assunto, nChamada, Acervo, ISBN, Quantidade, Situacao);
=======
  const { nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no Exemplar e nos dados fornecExemplaros
    await userModel.atualizarAcervo(Exemplar, nomeAutor, titulo, assunto, nChamada, acervo, isbn, quantidade, situacao);
>>>>>>> e21b48f7f4b3127314de2be7f34b5a77150a58f7
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Usuário atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o usuário");
  }
}


module.exports = {
  buscarPorExemplar,
  registrarAcervo,
  atualizarAcervo
};