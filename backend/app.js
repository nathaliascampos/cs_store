var express = require('express');
var app = express();
var mysql = require('mysql');

//Configuração do BD
var objConn = {
    host: 'localhost',
    user: 'root'
    password: '',
    database: 'skin_cs'
}

var port = process.env.PORT || 5000; 

//      API REST PELO EXPRESS:

var user = express.Router();

//INSERIR USER
user.post('inserir', function(req, res)){
    var login = req.body.login;
    var senha = req.body.senha;

    //var connection = mysql.createConnection(objConn)

    var strQuery = "INSERT INTO user (login, senha) VALUES ('" + login + "', '" + senha + "');";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
}

//ATUALIZAR USER
user.post('/atualizar', function(req, res) {
    var id = req.body.id;
    var login = req.body.login;
    var senha = req.body.senha;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "UPDATE user SET login = '" + login + "', senha = '" + senha + "' WHERE id = " + id + ";";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

//LISTAR TODOS USERS
user.get('/listarTodos', function(req, res) {
    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT id, login, senha FROM user";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
        	res.jsonp(rows);
        } else {
        	res.jsonp(err);
        }
    });

    connection.end();
});

//BUSCAR USER POR ID:
user.get('/buscarPorId/:id', function(req, res) {
    var id = req.params.id; //Aqui pegamos o ID como parâmetro, pois método GET não tem Body

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "SELECT id, login, senha FROM user WHERE id = " + id;

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
})

//REMOVER USER:
user.post('/remover', function(req, res) {
    var id = req.body.id;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "DELETE FROM user WHERE id = " + id;

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

app.use('/user', user);





