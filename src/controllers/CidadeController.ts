import { CidadeService } from "../services/CidadeService";
import {Request,Response} from 'express'

class CidadeController {

    async consultarCidade(req: Request,res: Response){

        const cidadeService = new CidadeService();
        const { nome ,estado } = req.body

          if(nome && estado == null){
            const docs = await cidadeService.procurarCidadeNome(nome);

            if(docs.length == 0){
            let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este nome"};
            res.status(404).json(response)
            
            }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
            }
        
        }
        
        if(nome == null && estado){
            const docs = await cidadeService.procurarCidadeEstado(req.body.estado);
            if(docs.length == 0){
            let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este estado"};
            res.status(404).json(response)
            
            }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
            }
        }

        if(nome == null && estado == null){
            let response = {status: 'Erro', resposta: "Coluna de tabela cidades não encontrada, pesquisar por estado ou nome"};
            res.status(404).json(response)
            
        }

        
    }
    
    async cadastrarCidade(req: Request,res: Response, next){
        const cidadeService = new CidadeService();

        const {nome,estado} = req.body;

        
          try {

            const todasCidades = await cidadeService.buscarTodasCidades()
            const id_cidade = todasCidades.length + 1;

            // const cidade = {nome:nome,estado:estado,id_cidade:id_cidade.toString() }
            const docs = await cidadeService.criarCidade({nome,estado,id_cidade});

            let response = {status: 'Sucesso', resposta: docs.ops, linhas_inseridas: docs.insertedCount };
            res.status(200).json(response)
          } catch (err) {
            let response = {status: 'Erro', resposta: err};
            res.json(response)
            next(err);
          }
        
        
    }
}

export {CidadeController}