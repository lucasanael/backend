const express = require('express');

const app = express();

const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
 
const routes = require('./app/routes/routes.js');

app.use('/', routes); 
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);

});