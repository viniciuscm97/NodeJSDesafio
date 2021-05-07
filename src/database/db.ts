const globalAny:any = global;

const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => globalAny.conn = conn.db("desafionode"))
            .catch(err => console.log(err));



function procurarCidadeNome(nome) {
    
    return globalAny.conn.collection("cidades").find({nome: nome}).toArray();
}

function procurarCidadeEstado(estado) {
    
    return globalAny.conn.collection("cidades").find({estado: estado}).toArray();
}

function procurarClienteNome(nome) {
    
    return globalAny.conn.collection("clientes").findOne({nome: nome});
}

function procurarClienteID(id) {
    console.log(id)
    return globalAny.conn.collection("clientes").findOne({id_cliente: id});
}

function cadastraCidade(cidade){
    return globalAny.conn.collection("cidades").insertOne(cidade);

}
function cadastraCliente(cliente){
    return globalAny.conn.collection("clientes").insertOne(cliente);

}
function deletarCliente(id){
    return globalAny.conn.collection("clientes").deleteOne({ id_cliente: id });

}
function alterarNomeCliente(nomePar,id){

    return globalAny.conn.collection("clientes").updateOne({ id_cliente: id }, { $set: {"nome": nomePar }})

}
function procurarCliente(id){
    return globalAny.conn.collection("clientes").findOne({id_cliente:id});
}

function todasCidades() {
    return globalAny.conn.collection("cidades").find().toArray();
}
function todosClientes() {
    return globalAny.conn.collection("clientes").find().toArray();
}
module.exports = {todosClientes,procurarCidadeNome,cadastraCidade,cadastraCliente,deletarCliente ,alterarNomeCliente,procurarCliente,procurarCidadeEstado,procurarClienteID,procurarClienteNome,todasCidades}