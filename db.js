const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("desafionode"))
            .catch(err => console.log(err));

 

function procurarCidadeNome(nome) {
    
    return global.conn.collection("cidades").find({nome: nome}).toArray();
}

function procurarCidadeEstado(estado) {
    
    return global.conn.collection("cidades").find({estado: estado}).toArray();
}

function procurarClienteNome(nome) {
    
    return global.conn.collection("clientes").findOne({nome: nome});
}

function procurarClienteID(id) {
    console.log(id)
    return global.conn.collection("clientes").findOne({id_cliente: id});
}

function cadastraCidade(cidade){
    return global.conn.collection("cidades").insertOne(cidade);

}
function cadastraCliente(cliente){
    return global.conn.collection("clientes").insertOne(cliente);

}
function deletarCliente(id){
    return global.conn.collection("clientes").deleteOne({ id_cliente: id });

}
function alterarNomeCliente(nomePar,id){

    return global.conn.collection("clientes").updateOne({ id_cliente: id }, { $set: {"nome": nomePar }})

}
function procurarCliente(id){
    return global.conn.collection("clientes").findOne({id_cliente:id});
}

function todasCidades() {
    return global.conn.collection("cidades").find().toArray();
}
function todosClientes() {
    return global.conn.collection("clientes").find().toArray();
}
module.exports = {todosClientes,procurarCidadeNome,cadastraCidade,cadastraCliente,deletarCliente ,alterarNomeCliente,procurarCliente,procurarCidadeEstado,procurarClienteID,procurarClienteNome,todasCidades}