const path_db = require('../db');

const express = require("express")
const routes = express.Router()

// cadastrar cidade
routes.post('/cidades', async(req,res,next) => {
  
  try {

    const todasCidades = await path_db.todasCidades();
    const id_cidade = todasCidades.length + 1;

    const {nome,estado} = req.body
    const cidade = {nome:nome,estado:estado,id_cidade:id_cidade.toString() }
    const docs = await path_db.cadastraCidade(cidade);

    var response = {status: 'Sucesso', resposta: docs.ops, linhas_inseridas: docs.insertedCount };
    res.json(response)
  } catch (err) {
    var response = {status: 'Erro', resposta: docs.ops};
    res.json(response)
    next(err);
  }
  
})

// cadastrar cliente

routes.post('/cliente', async(req,res,next) => {

  try {
    const todosClientes = await path_db.todosClientes();
    const id_cliente = todosClientes.length + 1;
    
    const {nome,sexo,data_nascimento,idade,cidade} = req.body

    const cliente = {
      nome:nome,sexo:sexo,data_nascimento:data_nascimento,idade:idade,cidade:cidade,
      id_cliente:id_cliente.toString()
    }

    const docs = await path_db.cadastraCliente(cliente);
    
    var response = {status: 'Sucesso', resposta: docs.ops, linhas_inseridas: docs.insertedCount };
    res.json(response)
  } catch (err) {
    var response = {status: 'Erro', resposta: docs.ops};
    res.json(response)
    next(err);
  }
})

// Consultar cidade pelo nome e estado
routes.get('/cidades', async(req,res,next) =>{

  if(req.body.nome || req.body.estado == null){
    try {
      const docs = await path_db.procurarCidadeNome(req.body.nome);
      
      var response = {status: 'Sucesso', resposta: docs};
      res.json(response)
    } catch (err) {
      var response = {status: 'Erro', resposta: docs};
      res.json(response)
      next(err);
    }
  
  }
  
  if(req.body.nome == null || req.body.estado){
    try {
      const docs = await path_db.procurarCidadeEstado(req.body.estado);
     
      var response = {status: 'Sucesso', resposta: docs};
      res.json(response)
    } catch (err) {
      var response = {status: 'Erro', resposta: docs};
      res.json(response)
      next(err);
    }
    
  }
  
})

// consultar cliente por ID e por nome
routes.get('/cliente', async(req,res,next) =>{

  if(req.body.nome || req.body.id == null){
    try {
      const docs = await path_db.procurarClienteNome(req.body.nome);
      
      var response = {status: 'Sucesso', resposta: docs};
      res.json(response)
    } catch (err) {
      var response = {status: 'Erro', resposta: docs};
      res.json(response)
      next(err);
    }
  
  }
  
  if(req.body.nome == null || req.body.id){
    try {
      const docs = await path_db.procurarClienteID(req.body.id);
      
      var response = {status: 'Sucesso', resposta: docs};
      res.json(response)
    } catch (err) {
      var response = {status: 'Erro', resposta: docs};
      res.json(response)
      next(err);
    }
    
  }

})

// remover cliente por id
routes.delete('/cliente', async(req,res,next) =>{
  
  try {
    console.log(req.body.id)
    const docs = await path_db.deletarCliente(req.body.id);
    
    var response = {status: 'Erro', resposta: "Linhas excluidas: "+docs.deletedCount};
    res.json(response)
  } catch (err) {
    var response = {status: 'Erro', resposta: "Linhas excluidas: "+docs.deletedCount};
    res.json(response)
    next(err);
  }

})

// alterar nome de cliente
routes.put('/cliente', async(req,res,next) =>{ 

  try {
    const docs = await path_db.alterarNomeCliente(req.body.nome,req.body.id);
    
    var response = {status: 'Sucesso', Linhas_alteradas: docs.result.nModified};
    res.json(response)
    
  } catch (err) {
    var response = {status: 'Erro', Linhas_alteradas: docs.result.nModified};
    res.json(response)
    next(err);
  }
  
  
})



module.exports = routes