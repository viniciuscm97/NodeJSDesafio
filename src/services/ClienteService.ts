import { Cliente } from "../models/Cliente";

const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));

// import {Cliente} from '../models/Cliente'
interface IClienteCreate {
    nome: string,
    sexo: string,
    data_nascimento: Date,
    idade: string,
    cidade:string,
    id_cliente: string
}
class ClienteService {

    buscarClientePorNome(nome: string){

        return globalAny.conn.collection("clientes").find({nome: nome}).toArray();
    }

    buscarClientePorID(id: string){

        return globalAny.conn.collection("clientes").findOne({id_cliente: id});
    }

    deletarCliente(id: string){
        return globalAny.conn.collection("clientes").deleteOne({ id_cliente: id });

    }
    alterarNomeCliente(novonome: string, id:string){
         return globalAny.conn.collection("clientes").updateOne({ id_cliente: id }, { $set: {"nome": novonome }})

    }

    cadastraCliente({nome,data_nascimento,sexo,idade,id_cliente,cidade}:IClienteCreate){
        const idString = id_cliente.toString()
        const cliente = new Cliente(idString,nome,data_nascimento,idade,sexo,cidade)
        return globalAny.conn.collection("clientes").insertOne(cliente);

    }
    todosClientes(){
        return globalAny.conn.collection("clientes").find().toArray();
    }
}

export {ClienteService}