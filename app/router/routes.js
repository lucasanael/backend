const express = require('express');

const router = express.Router();

const alunosController = require('../controllers/alunosController'); 
const livrosController = require('../controllers/livrosController'); 
const movimentoController = require('../controllers/movimentoController'); 
const cadastroUsuarioController = require('../controllers/cadastroUsuarioController'); 
const cadastroHostController = require('../controllers/cadastroHostController'); 





router.get('/alunos/:RM', alunosController.buscarPorRM);

router.post('/registraracervo', livrosController.registrarAcervo);

router.put('/atualizaracervo/:Exemplar', livrosController.atualizarAcervo);

router.post('/registrusuario', cadastroUsuarioController.registrarUsuario);

router.post('/registrusuario', cadastroHostController.registrarHost);


// Esta rota responde a requisições PUT, atualizando os dados de um
//cliente existente baseado no ID fornecido.
// Utiliza a função atualizar do controller de clientes para modificar
//o cliente especificado no banco de dados.
// Rota para deletar um cliente
// DELETE /api/clientes/:id
router.delete('/clientes/:id', clientesController.excluir);
// Esta rota responde a requisições DELETE, removendo um cliente do
//banco de dados baseado no ID fornecido.
// Utiliza a função excluir do controller de clientes para deletar o
//cliente especificado.
module.exports = router; 