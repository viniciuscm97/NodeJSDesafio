import { Cidade } from "../models/Cidade";

const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));


interface ICidadeCreate{
    nome:string;
    estado:string;
    id_cidade:string;
}
class CidadeService {

    criarCidade({nome,estado,id_cidade}: ICidadeCreate){
        const cidade = new Cidade(nome,estado,id_cidade);
        return globalAny.conn.collection("cidades").insertOne(cidade);

    }
    buscarTodasCidades(){
        return globalAny.conn.collection("cidades").find().toArray();

    }

    procurarCidadeNome(nome:string){
         return globalAny.conn.collection("cidades").find({nome: nome}).toArray();

    }

    procurarCidadeEstado(estado:string){
        return globalAny.conn.collection("cidades").find({estado: estado}).toArray();

    }

}

export { CidadeService }