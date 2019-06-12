// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 50;
    return banco.sql.query(`select top ${limite_linhas} 
                            *
                            from Porturas order by sanscrito desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	  tipo = req.body.tipo; // depois de .body, use o nome (name) do campo em seu formulário de login
    sanscrito = req.body.sanscrito; // depois de .body, use o nome (name) do campo em seu formulário de login
    ingles = req.body.ingles; // depois de .body, use o nome (name) do campo em seu formulário de login
    portugues = req.body.portugues; // depois de .body, use o nome (name) do campo em seu formulário de login
    imagem = req.body.imagem; // depois de .body, use o nome (name) do campo em seu formulário de login
   
   return banco.sql.query(`insert into Porturas values 
    ('${tipo}', '${sanscrito}', '${ingles}', '${portugues}', '${imagem}');
    `);
  }).then(consulta => {

			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	
  });

// não mexa nesta linha!
module.exports = router;


