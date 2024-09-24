const userModel = require("../model/alunosModel");

async function getAluno(req, res) {
    // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
    const rmdoAluno = req.params.rm;

    console.log(`RM do aluno: ${rmdoAluno}`); // Adicionei o log aqui
    
    try {
        // Chama o método do modelo para obter o usuário com base no ID fornecido
        const Aluno = await userModel.getAlunobyRm(rmdoAluno);

        // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
        if (!Aluno) {
            res.status(404).send("Usuário não encontrado");
        } else {
            // Se o usuário for encontrado, retorna os dados em formato JSON
            res.json(Aluno);
        }
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao obter o usuário");
    }
}


// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getAluno

};