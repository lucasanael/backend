const express = require('express');

const router = express.Router();

const alunosController = require('../controller/alunosController.js'); 
const livrosController = require('../controller/livrosController.js'); 
const emprestarController = require('../controller/emprestarController.js'); 
const reservaController  = require ('../controller/reservaController.js')
const cadastroUsuarioController = require('../controller/cadastroUsuarioController.js'); 


router.get('/alunos/:rm', alunosController.getAluno);

router.post('/registraracervo', livrosController.registrarAcervo);

router.get('/buscaracervo/:Exemplar', livrosController.buscarPorExemplar);

router.put('/atualizaracervo/:Exemplar', livrosController.atualizarAcervo);

router.post('/registrarusuario', cadastroUsuarioController.createUsuario);

router.post('/reservar', reservaController.registrarReserva)

router.post('/emprestar', emprestarController.registrarEmprestimo)


module.exports = router; 