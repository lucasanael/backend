const express = require('express');

const cors = require('cors');

const clienteRoutes = require('./app/router/routes.js');

const app = express();

app.use(express.json()); 

app.use('/router', clienteRoutes); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);


});