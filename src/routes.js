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
    res.status(200).json(response)
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
    res.status(200).json(response)
  } catch (err) {
    var response = {status: 'Erro', resposta: docs.ops};
    res.json(response)
    next(err);
  }
})

// Consultar cidade pelo nome e estado
routes.get('/cidades', async(req,res,next) =>{

  if(req.body.nome && req.body.estado == null){
    const docs = await path_db.procurarCidadeNome(req.body.nome);
    console.log(docs)
    if(docs.length == 0){
      var response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este nome"};
      res.status(202).json(response)
      
    }else{
      var response = {status: 'Sucesso', resposta: docs};
      res.status(200).json(response)
    }
  
  }
  
  if(req.body.nome == null && req.body.estado){
    const docs = await path_db.procurarCidadeEstado(req.body.estado);
    if(docs.length == 0){
      var response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este estado"};
      res.status(202).json(response)
      
    }else{
      var response = {status: 'Sucesso', resposta: docs};
      res.status(200).json(response)
    }
  }

  if(req.body.nome == null && req.body.estado == null){
    var response = {status: 'Erro', resposta: "Coluna de tabela cidades não encontrada, pesquisar por estado ou nome"};
      res.status(202).json(response)
      
  }

  
})

// consultar cliente por ID e por nome
routes.get('/cliente', async(req,res,next) =>{

  if(req.body.nome && req.body.id == null){
    const docs = await path_db.procurarClienteNome(req.body.nome);
    if(docs == null){
      var response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este nome"};
      res.status(202).json(response)
      
    }else{
      var response = {status: 'Sucesso', resposta: docs};
      res.status(200).json(response)
    }
  
  }
  
  if(req.body.nome == null && req.body.id){
    const docs = await path_db.procurarClienteID(req.body.id);
    if(docs == null){
      var response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este ID"};
      res.status(202).json(response)
     
    }else{
      var response = {status: 'Sucesso', resposta: docs};
      res.status(200).json(response)
    }
    
  }

  if(req.body.nome == null && req.body.id == null){
    var response = {status: 'Erro', resposta: "Coluna de tabela Cliente não encontrada, pesquisar por id ou nome"};
      res.status(202).json(response)
      
  }

})

// remover cliente por id
routes.delete('/cliente', async(req,res,next) =>{
  if(req.body.id){
    const docs = await path_db.deletarCliente(req.body.id);
    if(docs.deletedCount == 0){
      var response = {status: 'Erro', resposta: "Nenhum cliente encontrado com este ID: "+req.body.id};
      res.status(202).json(response)
    }else{
      var response = {status: 'Sucesso', resposta: "Linhas excluidas: "+docs.deletedCount};
      res.status(200).json(response)
    }
  }else{
    var response = {status: 'Erro', resposta: "Nome de coluna na tabela cliente não encontrado, pesquisar por id"};
    res.status(202).json(response)
  }



})

// alterar nome de cliente
routes.put('/cliente', async(req,res,next) =>{

  if(req.body.novonome && req.body.id){
    const docs = await path_db.alterarNomeCliente(req.body.novonome,req.body.id);
    if(docs.result.nModified == 0){
      var response = {status: 'Erro', Linhas_alteradas: docs.result.nModified, resposta: "Nenhuma linha foi alterada pois cliente já estava com este nome cadastrado"};
      res.status(202).json(response)
    }else{
      var response = {status: 'Sucesso', Linhas_alteradas: docs.result.nModified};
      res.status(200).json(response)
    }
  }

  if(req.body.novonome == null || req.body.id == null){
    var response = {status: 'Erro', resposta: "Nenhuma linha foi alterada! Para alterar o nome do cliente informe id e novonome"};
      res.status(202).json(response)
  }
    
})



module.exports = routes