const express = require('express');

const clienteRoutes = require('./routes/routes.js');

const app = express();

app.use(express.json()); 

app.use('/api', clienteRoutes); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);


});