const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

const conexao = mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));

// import {Cliente} from '../models/Cliente'

class ClienteService {

    buscarClientePorNome(nome: string){
        const x =  globalAny.conn.collection("clientes").find({nome: nome}).toArray()
        console.log(x)
        return globalAny.conn.collection("clientes").find({nome: nome}).toArray();
    }

}

export {ClienteService}