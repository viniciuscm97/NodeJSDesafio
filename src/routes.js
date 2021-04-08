const path_db = require('../db');

const express = require("express")
const routes = express.Router()

var fs = require('fs');

// cadastrar cidade
routes.post('/cidades', function(req,res){

  fs.readFile('./data/cidades.json', 'utf8', function(err, cidades){
    if (err) {
      var response = {status: 'Erro', resposta: err};
      res.json(response);
    } else {
      var obj = JSON.parse(cidades);
      req.body.id_cidade = obj.cidades.length + 1;
  
      obj.cidades.push(req.body);
  
      fs.writeFile('./data/cidades.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'Erro', resposta: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resposta: 'Registro incluso com sucesso'};
          res.json(response);
        }
      });
    }
  });
})

// cadastrar cliente

routes.post('/cliente', function(req,res){

  fs.readFile('./data/clientes.json', 'utf8', function(err, cliente){
    if (err) {
      var response = {status: 'Erro', resposta: err};
      res.json(response);
    } else {
      var obj = JSON.parse(cliente);
      req.body.id_cliente = obj.clientes.length + 1;
      obj.clientes.push(req.body);
  
      fs.writeFile('./data/clientes.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'Erro', resposta: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resposta: 'Registro incluso com sucesso'};
          res.json(response);
        }
      });
    }
  });
})

// Consultar cidade pelo nome e estado
routes.get('/cidades', async(req,res,next) =>{

    const docs = await path_db.todasCidades();
    res.json(docs)

})
// routes.get('/cidades', function(req,res){

//   fs.readFile('./data/cidades.json', 'utf8', function(err, cidades){
//       if (err) {
//         var response = {status: 'Erro', resposta: err};
//         res.json(response);
//       } else {
//         var obj = JSON.parse(cidades);
//         const result = [];
//         var status = "Nenhuma cidade foi encontrada";

//         if(req.query.nome){
//           status = 'Nenhuma cidade foi encontrada com este nome';
//           obj.cidades.forEach(function(cidades) {
//             if (cidades != null) {
//               if (cidades.nome == req.query.nome) {
//                 result.push({cidades});
//                 status = 'Cidade encontrada'
//               }
//             }
//            });
//         }

//         if(req.query.estado){
//           status = 'Nenhuma cidade foi encontrado com este estado';
//           obj.cidades.forEach(function(cidades) {
//             if (cidades != null) {
//               if (cidades.estado == req.query.estado) {
//                 status = 'Cidade encontrada'
//                 result.push({cidades});
//               }    
//             }
//            });
//         }
//           var response = {status, resposta: result};
//           res.json(response);
//       }
//     });

// })
// consultar cliente por ID e por nome
routes.get('/cliente', function(req,res){

    fs.readFile('./data/clientes.json', 'utf8', function(err, clientes){
        if (err) {
          var response = {status: 'Erro', resposta: err};
          res.json(response);
        } else {
          var obj = JSON.parse(clientes);
          const result = [];
          var status = "Nenhum cliente foi encontrado";
          
          if(req.query.id_cliente){
            status = 'Nenhum cliente foi encontrado com este id';
            obj.clientes.forEach(function(cliente) {
              if (cliente != null) {
                if (cliente.id_cliente == req.query.id_cliente) {
                  status = 'Cliente encontrado'
                  result.push({cliente});
                }    
              }
             });
          }

          if(req.query.nome){
            status = 'Nenhum cliente foi encontrado com este nome';
            obj.clientes.forEach(function(cliente) {
              if (cliente != null) {
                if (cliente.nome == req.query.nome) {
                  status = 'Cliente encontrado'
                  result.push({cliente});
                }    
              }
             });
          }
            var response = {status, resposta: result};
            res.json(response);
        }
      });

})

// remover cliente
routes.delete('/cliente', function(req,res){
  
  fs.readFile('./data/clientes.json', 'utf8', function(err, clientes){
    if (err) {
      var response = {status: 'Erro', resposta: err};
      res.json(response);
    } else {
      var obj = JSON.parse(clientes);
      
      delete obj.clientes[req.body.id_cliente-1];
  
      fs.writeFile('./data/clientes.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'Erro', resposta: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resposta: 'Registro excluido com sucesso'};
          res.json(response);
        }
      });
    }
  });
})

// alterar nome de cliente
routes.put('/cliente', function(req,res){
  
  fs.readFile('./data/clientes.json', 'utf8', function(err, clientes){
    if (err) {
      var response = {status: 'Erro', resposta: err};
      res.json(response);
    } else {
      var obj = JSON.parse(clientes);
      var status = "Nenhum cliente foi encontrado";
      
      if(req.body.id_cliente){
        status = "Nenhum cliente foi encontrado com este id_cliente";
        obj.clientes.forEach(function(cliente) {
          if (cliente != null) {
            if (cliente.id_cliente == req.body.id_cliente) {
              status = "Processo realizado";
              obj.clientes[(cliente.id_cliente-1)].nome = req.body.nome;
              
            }    
          }
         });

      }
      
      if(req.body.novo_nome){
        status = "Nenhum cliente foi encontrado com este nome";
        obj.clientes.forEach(function(cliente) {
          if (cliente != null) {
            if (cliente.nome == req.body.nome) {
              status = "Processo realizado";
              obj.clientes[(cliente.id_cliente-1)].nome = req.body.novo_nome;
              
            }    
          }
         });
      }
      
      
  
      fs.writeFile('./data/clientes.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: status, resposta: err};
          res.json(response);
        } else {
          var response = {status: "sucesso", resposta: status};
          res.json(response);
        }
      });
    }
  });
})



module.exports = routes