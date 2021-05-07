
import {ClienteController} from './controllers/ClienteController'

import {Router} from "express"
import { CidadeController } from './controllers/CidadeController'

const routes = Router()
const clienteController = new ClienteController()

const cidadeController = new CidadeController()


// // cadastrar cidade

routes.post('/cidades', cidadeController.cadastrarCidade)

// cadastrar cliente

routes.post('/cliente',clienteController.cadastrarCliente)

// // Consultar cidade pelo nome e estado
routes.get('/cidades', cidadeController.consultarCidade)


// consultar cliente por ID e por nome
routes.get('/cliente',clienteController.buscarClientePorNomeID)


// // remover cliente por id
routes.delete('/cliente',clienteController.removerClientePorId)

// // alterar nome de cliente

routes.put('/cliente',clienteController.alterarNomeCliente)



export { routes }