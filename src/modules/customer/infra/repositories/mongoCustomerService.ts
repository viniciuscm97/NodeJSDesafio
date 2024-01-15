import { ICustomerService } from "../../domain/repositories/CustomerService";
import { Cliente } from "../models/Cliente";

const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));

class MongoCustomerService implements ICustomerService{

    getByName(nome: string){
        return globalAny.conn.collection("clientes").find({nome: nome}).toArray();
    }

    getById(id: string){

        return globalAny.conn.collection("clientes").findOne({id_cliente: id});
    }

    delete(id: string){
        return globalAny.conn.collection("clientes").deleteOne({ id_cliente: id });

    }
    updateName(novonome: string, id:string){
         return globalAny.conn.collection("clientes").updateOne({ id_cliente: id }, { $set: {"nome": novonome }})

    }

    create({nome,data_nascimento,sexo,idade,id_cliente,cidade}:IClienteCreate){
        const idString = id_cliente.toString()
        const cliente = new Cliente(idString,nome,data_nascimento,idade,sexo,cidade)
        return globalAny.conn.collection("clientes").insertOne(cliente);

    }
    getAll(){
        return globalAny.conn.collection("clientes").find().toArray();
    }
}

export { MongoCustomerService };

