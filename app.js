const express = require('express');
const app = express();
const port = 3000


const userRouter = require('./app/router')

app.use('/', userRouter);

app.listen(port, () => {

    console.log(`Servidor rodando na porta: ${port}`)

});