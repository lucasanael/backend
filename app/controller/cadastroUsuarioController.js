
const userModel = require("../model/cadastroUsuarioModel");

async function createUsuario(req, res) {

    const { cpf, Sexo, name, telefone, dataNasc, email } = req.body;
    
  try {

    await userModel.createUsuario(cpf, Sexo, name, telefone, dataNasc, email);
    

    res.status(201).send("Usuário criado com sucesso");
  } catch (err) {

    console.error(err.message);
    res.status(500).send("Erro ao criar o usuário");
  }
}


module.exports = {
  createUsuario,
  
};

