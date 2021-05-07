
import {ClienteService} from '../services/ClienteService'
import {Request, Response} from 'express'

class ClienteController {
    private clienteService: ClienteService;

    constructor(){
        this.clienteService = new ClienteService()
    }

    async buscarClientePorNomeID(req: Request,res: Response) : Promise<Response> {

        const { nome } = req.body
        console.log(this.clienteService)
        const docs = await this.clienteService.buscarClientePorNome(nome);
        let response = {status: 'Sucesso', resposta: docs};
        return res.status(200).json(response)

        
        // if(nome && id == null){
            

        //   if(docs == null){
        //     let response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este nome"};
        //     res.status(404).json(response)
            
        //   }else{
        //     let response = {status: 'Sucesso', resposta: docs};
        //     res.status(200).json(response)
        //   }
        
        // }
        
        // if(req.body.nome == null && req.body.id){
        //   const docs = await path_db.procurarClienteID(req.body.id);
        //   if(docs == null){
        //     let response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este ID"};
        //     res.status(404).json(response)
           
        //   }else{
        //     let response = {status: 'Sucesso', resposta: docs};
        //     res.status(200).json(response)
        //   }
          
        // }
      
        // if(req.body.nome == null && req.body.id == null){
        //   let response = {status: 'Erro', resposta: "Coluna de tabela Cliente não encontrada, pesquisar por id ou nome"};
        //     res.status(404).json(response)
            
        // }
      
      }
}

export { ClienteController };