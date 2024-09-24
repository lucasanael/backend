
const userModel = require("../model/cadastroHostModel");

async function createHost(req, res) {

    const { name, email, Sexo, dataNasc, senha } = req.body;
    
  try {

    await userModel.createHost(name, email, Sexo, dataNasc, senha);
    

    res.status(201).send("Usuário criado com sucesso");
  } catch (err) {

    console.error(err.message);
    res.status(500).send("Erro ao criar o usuário");
  }
}


module.exports = {
  createHost,
  
};

