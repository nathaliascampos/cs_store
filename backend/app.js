var express = require('express');
var cors = require('cors'); //new
var app = express();
var bodyParser = require('body-parser'); //new
var mysql = require('mysql');

//Configuração do BD
var objConn = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; 

// API REST PELO EXPRESS:
var user = express.Router();
var skin = express.Router();

// ----USER----

//ENTRAR COM O USER nao vai ter
user.post('/entrar', function(req, res){
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
});

//ATUALIZAR USER nao vai ter
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

// LISTAR TODOS USERS não vai ter
user.get('/listarTodos', function(req, res) {
    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idUser, login, senha FROM user";

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




//BUSCAR USER POR ID: vai ter
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

//REMOVER USER: não vai ter
// user.post('/remover', function(req, res) {
//     var id = req.body.id;

//     var connection = mysql.createConnection(objConn);

//     connection.connect();

//     var strQuery = "DELETE FROM user WHERE id = " + id;

//     console.log(strQuery);

//     connection.query(strQuery, function(err, rows, fields) {
//         if (!err) {
//             res.jsonp(rows);
//         } else {
//             res.jsonp(err);
//         }
//     });

//     connection.end();
// });



//Login user
user.post('/loginUser', function(req, res) {
    var loginUser = req.body.login;
    var senhaUser = req.body.senha;

    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT * FROM user WHERE login = '" +  loginUser + "' AND senha = '" + senhaUser + "' ";

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

//  ----SKIN----

//Listar todas as skins
skin.get('/listarTodos', function(req, res) {
    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idSkin, nome, nome_skin, tipo, preco FROM skin";

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

//Listar Skins do tipo Riffle
skin.get('/listarRifle', function(req, res) {
    var tipo_skin = "Rifle";

    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idSkin, nome, nome_skin, preco FROM skin WHERE tipo = '" + tipo_skin + "'";

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

//Listar Skins do tipo AWP
skin.get('/listarAWP', function(req, res) {
    var tipo_skin = "AWP";

    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idSkin, nome, nome_skin, preco FROM skin WHERE tipo = '" + tipo_skin + "'";

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

//Listar Skins do tipo Pistol
skin.get('/listarPistol', function(req, res) {
    var tipo_skin = "Pistol";

    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idSkin, nome, nome_skin, preco FROM skin WHERE tipo = '" + tipo_skin + "'";

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

//Listar Skins do tipo Knife
skin.get('/listarKnife', function(req, res) {
    var tipo_skin = "Knife";

    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT idSkin, nome, nome_skin, preco FROM skin WHERE tipo = '" + tipo_skin + "'";

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

//Buy
skin.post('/buySkin', function(req, res){
    var idUser = req.body.id;
    var idSkin = req.body.id;

    //var connection = mysql.createConnection(objConn)

    var strQuery = "INSERT INTO user_has_skin (ser_idUser, Skin_idSkin) VALUES ('" + idUser + "', '" + idSkin + "');";

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
app.use('/skin', skin);

app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);



