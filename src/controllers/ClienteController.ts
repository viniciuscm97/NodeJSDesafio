
import {ClienteService} from '../services/ClienteService'
import {Request, Response} from 'express'

class ClienteController {
    // clienteService: ClienteService;

    // constructor(){
    //     this.clienteService = new ClienteService()
    // }

    // buscar cliente por id ou por nome, caso deseje buscar por id, informar o campo id, caso queira por nome pesquisar nome
      async buscarClientePorNomeID(req: Request,res: Response) {
        const clienteService = new ClienteService()
        const { nome ,id } = req.body
        
        if(nome && id == null){
          const docs =  await clienteService.buscarClientePorNome(nome);
          console.log(docs)
          console.log(docs.length)

          if(docs.length == 0){
            let response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este nome"};
            res.status(404).json(response)
            
          }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
          }
        
        }
        
        if(nome == null && id){
          const docs = await clienteService.buscarClientePorID(id);
          console.log(docs)

          if(docs == null){
            let response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este ID"};
            res.status(404).json(response)
           
          }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
          }
          
        }
      
        if(nome == null && id == null){
          let response = {status: 'Erro', resposta: "Coluna de tabela Cliente não encontrada, pesquisar por id ou nome"};
            res.status(404).json(response)
            
        }
      
      }
    // informar id para remover cliente
      async removerClientePorId(req: Request,res: Response) {
        const clienteService = new ClienteService()
        const { id } = req.body

          if(id){
            const docs = await clienteService.deletarCliente(id);
            if(docs.deletedCount == 0){
              let response = {status: 'Erro', resposta: "Nenhum cliente encontrado com este ID: "+req.body.id};
              res.status(404).json(response)
            }else{
              let response = {status: 'Sucesso', resposta: "Linhas excluidas: "+docs.deletedCount};
              res.status(200).json(response)
            }
          }else{
            let response = {status: 'Erro', resposta: "Nome de coluna na tabela cliente não encontrado, pesquisar por id"};
            res.status(404).json(response)
          }

      }

      // alterar nome de cliente, informar id como id e novonome passando o mesmo
      async alterarNomeCliente(req: Request,res: Response) {
        const clienteService = new ClienteService()

        const { novonome,id } = req.body

          if(novonome && id){
            let docs = await clienteService.buscarClientePorID(id);
           
            if(docs == null){
              let response = {status: 'Erro', resposta: "Nenhum usuário encontrado com este ID"};
              res.status(404).json(response)
             
            }else{
              let docs = await clienteService.alterarNomeCliente(novonome,id);

              if(docs.result.nModified == 0){
                let response = {status: 'Erro', Linhas_alteradas: docs.result.nModified, resposta: "Nenhuma linha foi alterada pois cliente já estava com este nome cadastrado"};
                res.status(404).json(response)
              }else{
                let response = {status: 'Sucesso', Linhas_alteradas: docs.result.nModified};
                res.status(200).json(response)
              }

            }
          }

            if(novonome == null || id == null){
              let response = {status: 'Erro', resposta: "Nenhuma linha foi alterada! Para alterar o nome do cliente informe id e novonome"};
                res.status(404).json(response)
            }
                  
      }

      async  cadastrarCliente(req: Request,res: Response, next) {
          const clienteService = new ClienteService()
          const {nome,sexo,data_nascimento,idade,cidade} = req.body

          try {
            const todosClientes = await clienteService.todosClientes();
            const id_cliente = todosClientes.length + 1;           

            console.log(id_cliente)

            const docs = await clienteService.cadastraCliente({nome,sexo,data_nascimento,idade,cidade, id_cliente});
            
            let response = {status: 'Sucesso', resposta: docs.ops, linhas_inseridas: docs.insertedCount };
            res.status(200).json(response)
          } catch (err) {
            let response = {status: 'Erro', resposta: err};
            res.json(response)
            next(err);
          }
      }
}

export { ClienteController };