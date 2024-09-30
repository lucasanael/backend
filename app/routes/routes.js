const express = require('express');

const router = express.Router();

const alunosController = require('../controller/alunosController.js'); 
const livrosController = require('../controller/livrosController.js'); 
const movimentoController = require('../controller/movimentoController.js'); 
const cadastroUsuarioController = require('../controller/cadastroUsuarioController.js'); 
const cadastroHostController = require('../controller/cadastroHostController.js'); 


router.get('/alunos/:rm', alunosController.getAluno);

router.post('/registraracervo', livrosController.registrarAcervo);

router.get('/buscaracervo/:Exemplar', livrosController.buscarPorExemplar);

router.put('/atualizaracervo/:Exemplar', livrosController.atualizarAcervo);

router.get('/atualizaracervo/', livrosController.getBooks);

router.post('/registrarusuario', cadastroUsuarioController.createUsuario);

router.post('/registrarhost', cadastroHostController.createHost);


module.exports = router; 