const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("desafionode"))
            .catch(err => console.log(err));

 

function todasCidades() {
    return global.conn.collection("cidades").find().toArray();
}
 
 
module.exports = {todasCidades }