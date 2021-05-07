import  {globalAny} from '../database/db';

import {Cliente} from '../models/Cliente'

class ClienteService {

    async buscarClientePorNome(nome: string){
        console.log(nome)
        return globalAny.conn.collection("cidades").find({nome: nome}).toArray();
    }

}

export {ClienteService}