const express = require('express');

const router = express.Router();

const alunosController = require('../controller/alunosController.js'); 
const livrosController = require('../controller/livrosController'); 
const movimentoController = require('../controller/movimentoController'); 
const cadastroUsuarioController = require('../controller/cadastroUsuarioController'); 
const cadastroHostController = require('../controller/cadastroHostController'); 





router.get('/alunos/:RM', alunosController.buscarPorRM);

router.post('/registraracervo', livrosController.registrarAcervo);

router.put('/atualizaracervo/:Exemplar', livrosController.atualizarAcervo);

router.post('/registrusuario', cadastroUsuarioController.registrarUsuario);

router.post('/registrhost', cadastroHostController.registrarHost);


module.exports = router; 