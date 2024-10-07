const userModel = require("../model/reservaModel");



// Função para criar um novo usuário
async function registrarReserva(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const { Nome, Título, RM, CPF, Exemplar } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecExemplaros
    await userModel.registrarReserva(Nome, Título, RM, CPF, Exemplar);
  
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Reserva criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o reserva");
  }
}


module.exports = {
    registrarReserva,

};