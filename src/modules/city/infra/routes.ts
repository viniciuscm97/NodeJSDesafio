import { Router } from "express"
import { CidadeController } from "../../../controllers/CidadeController"

const routes = Router()

const cidadeController = new CidadeController()

routes.post('/cidades', cidadeController.cadastrarCidade)
routes.get('/cidades', cidadeController.consultarCidade)


export { routes }

