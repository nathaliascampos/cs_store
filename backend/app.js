var restify = require('restify');

function helloF(res, res, next){
    var mensagem = {
        texto: 'Hello world'
    }

    res.json(mensagem);
    next();
}

var server = restify.createServer({
    name: 'Node 1'
});

// http://localhost:5000/hello -> chama função helloF GET NO POSTMAN
server.get('/hello', helloF);

server.listen(5000, function(){
    console.log('%s sendo executado!', server.name)
});