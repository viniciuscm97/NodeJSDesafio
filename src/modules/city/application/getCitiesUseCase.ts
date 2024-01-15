import { CityRepository } from "../domain/repositories/CityRepository";

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepository) { }

    async execute({ name, state }) {

          if(name && state == null){
            const docs = await this.cityRepository.getByName(name);

            if(docs.length == 0){
            let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este nome"};
            res.status(404).json(response)
            
            }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
            }
        
        }
        
        if(name == null && state){
            const docs = await this.cityRepository.getByEstado(state);
            if(docs.length == 0){
            let response = {status: 'Erro', resposta: "Nenhuma cidade encontrada com este estado"};
            res.status(404).json(response)
            
            }else{
            let response = {status: 'Sucesso', resposta: docs};
            res.status(200).json(response)
            }
        }

        if(name == null && state == null){
            let response = {status: 'Erro', resposta: "Coluna de tabela cidades não encontrada, pesquisar por estado ou nome"};
            res.status(404).json(response)
            
        }

        
    }
}