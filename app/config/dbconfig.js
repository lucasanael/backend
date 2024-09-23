const { Connection } = require('tedious');
const express = require('express');

var config = {
"server": "localhost",
"authentication": {
"type": "default",
"options": {
"userName": "sa",
"password": "corinthians1910"
}
},
"options": {
"port": 1433,
"database": "vendasx",
"trustServerCertificate": true
}
}

var connection = new Connection(config);

connection.on('connect', function (err) {
if (err) {
console.log('Falhou a conexão');
throw err;
}

console.log("Connectado !");
});

connection.connect();

module.exports = config;