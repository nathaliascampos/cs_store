/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var cors = require('cors')
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser'); //chamando o pacote body-parser
var mysql = require('mysql');

/** Vars for DB config */
var objConn = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'churrasco'
    };

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 5000;

//Rotas da nossa API:
//==============================================================

/* Aqui o 'churrasco' irá pegar as instâncias das Rotas do Express */
var churrasco = express.Router();

/* Para sabermos se tudo está realmente funcionando
podemos acessar através de GET: http://localhost:8000/churrasco/buscarTodos) */
churrasco.post('/inserir', function(req, res) {
    var carne = req.body.carne;
    var peso = req.body.peso;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "INSERT INTO churrasco (carne, peso) VALUES ('" + carne + "', '" + peso + "');";

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

churrasco.post('/atualizar', function(req, res) {
    var id = req.body.id;
    var carne = req.body.carne;
    var peso = req.body.peso;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "UPDATE churrasco SET carne = '" + carne + "', peso = '" + peso + "' WHERE id = " + id + ";";

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

churrasco.get('/buscarTodos', function(req, res) {
    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT id, carne, peso FROM churrasco";

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

churrasco.get('/buscarPorId/:id', function(req, res) {
    var id = req.params.id; //Aqui pegamos o ID como parâmetro, pois método GET não tem Body

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "SELECT id, carne, peso FROM churrasco WHERE id = " + id;

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

churrasco.post('/remover', function(req, res) {
    var id = req.body.id;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "DELETE FROM churrasco WHERE id = " + id;

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

/** Todas as nossas rotas serão prefixadas com '/churrasco'.
Para chamar todas as funções que chamarem o objeto 
'churrasco' deveremos acessar o endpoint /churrasco/*
*/
app.use('/churrasco', churrasco); 

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);