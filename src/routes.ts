
import {ClienteController} from './controllers/ClienteController'

import {Router} from "express"

const routes = Router()
const clienteController = new ClienteController()

// // cadastrar cidade
// routes.post('/cidades', async(req,res,next) => {
//   let docs = []

//   try {

//     const todasCidades = await path_db.todasCidades();
//     const id_cidade = todasCidades.length + 1;

//     const {nome,estado} = req.body
//     const cidade = {nome:nome,estado:estado,id_cidade:id_cidade.toString() }
//     docs = await path_db.cadastraCidade(cidade);

//     let response = {status: 'Sucesso', resposta: docs.ops, linhas_inseridas: docs.insertedCount };
//     res.status(200).json(response)
//   } catch (err) {
//     let response = {status: 'Erro', resposta: docs.ops};
//     res.json(response)
//     next(err);
//   }
  
// })

// cadastrar cliente

routes.post('/cliente',clienteController.cadastrarCliente)

// // Consultar cidade pelo nome e estado
// routes.get('/cidades', async(req,res,next) =>{

//   if(req.body.nome && req.body.estado == null){
//     const docs = await path_db.procurarCidadeNome(req.body.nome);
//     console.log(docs)
//     if(docs.length == 0){
//       let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este nome"};
//       res.status(404).json(response)
      
//     }else{
//       let response = {status: 'Sucesso', resposta: docs};
//       res.status(200).json(response)
//     }
  
//   }
  
//   if(req.body.nome == null && req.body.estado){
//     const docs = await path_db.procurarCidadeEstado(req.body.estado);
//     if(docs.length == 0){
//       let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este estado"};
//       res.status(404).json(response)
      
//     }else{
//       let response = {status: 'Sucesso', resposta: docs};
//       res.status(200).json(response)
//     }
//   }

//   if(req.body.nome == null && req.body.estado == null){
//     let response = {status: 'Erro', resposta: "Coluna de tabela cidades não encontrada, pesquisar por estado ou nome"};
//       res.status(404).json(response)
      
//   }

  
// })

// consultar cliente por ID e por nome
routes.get('/cliente',clienteController.buscarClientePorNomeID)


// // remover cliente por id
routes.delete('/cliente',clienteController.removerClientePorId)

// // alterar nome de cliente

routes.put('/cliente',clienteController.alterarNomeCliente)



export { routes }