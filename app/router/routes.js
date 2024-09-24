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

router.post('/registrhost', cadastroHostController.registrarHost);


module.exports = router; 