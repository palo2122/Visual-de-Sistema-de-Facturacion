const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://nando2224:nando2224@clustercertus.8ka94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let client;

module.exports = function(){
    if(!client){
        try{
            client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true})
        }catch(e){
            console.log("Error al conectarse a la BD", e)
        }
    }
    return client;
}