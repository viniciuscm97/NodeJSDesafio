import { Cidade } from "../models/Cidade";

const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));


class MongoCityRepository implements ICityRepository {
    create({ name, state, id_city }){
        const city = new Cidade(name,state,id_city);
        return globalAny.conn.collection("cidades").insertOne(city);

    }
    getAll(){
        return globalAny.conn.collection("cidades").find().toArray();

    }

    getByName(name:string){
         return globalAny.conn.collection("cidades").find({nome: name}).toArray();

    }

    getByEstado(state: string){
        return globalAny.conn.collection("cidades").find({estado: state}).toArray();
    }

}

export { MongoCityRepository };

