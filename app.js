var Connection = require('tedious').Connection;

var config = {

    "server": "127.0.0.1",
    "authentication": {
    "type": "default",
  
       "options": {
        "userName": "sa",
        "password": "1327"

    }},

    "options": {
    "port": 1433,
    "database": "biblioteca",
    "trustServerCertificate": true,
    
 }
}

var connection = new Connection(config);
connection.on('connect', function(err){
    console.log('Conectd !')
    executeStatement()
})
;
connection.connect()


var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {

    var request = new Request("SELECT Exemplar, Título FROM Livros where Livros.Exemplar = '1021822' ", function (err) {
        if (err) {
            console.log(err);
        }
    });

    var result = "";

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('null')
            } else {
                result += column.value + ""
            }

        });
        console.log(result);
        result = "";
    });

    request.on ('done' , function(rowCount, more){
        console.log(rowCount + ' rows returned');
        console.log("Linhas retornadas");
    })
    
    request.on("requestCompleted", function(rowCount, more){
    
    connection.close();
    
    })
    
    connection.execSql(request)
    

}   