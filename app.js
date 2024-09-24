const express = require('express');

const clienteRoutes = require('./app/router/routes.js');

const app = express();

app.use(express.json()); 

app.use('/router', clienteRoutes); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);


});