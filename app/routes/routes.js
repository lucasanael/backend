const express = require('express');

const router = express.Router();

const alunosController = require('../controller/alunosController.js'); 
const livrosController = require('../controller/livrosController.js'); 
const emprestarController = require('../controller/emprestarController.js'); 
const reservaController  = require ('../controller/reservaController.js')
const cadastroColaboradorController = require('../controller/cadastroColaboradorController.js'); 


router.get('/alunos/:rm', alunosController.getAluno);

router.post('/registraracervo', livrosController.registrarAcervo);

router.get('/buscaracervo/:Exemplar', livrosController.buscarPorExemplar);

router.get('/buscaremprestimo/:Exemplar', livrosController.buscarEmprestimo);

router.put('/atualizaracervo/:Exemplar', livrosController.atualizarAcervo);

router.post('/registrarcolaborador', cadastroColaboradorController.createColaborador);

router.get('/listarcolaborador/:cpf', cadastroColaboradorController.getColaborador);

router.post('/reservar', reservaController.registrarReserva)

router.post('/emprestar', emprestarController.registrarEmprestimo)


module.exports = router; 