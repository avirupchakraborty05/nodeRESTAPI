const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:fapWoP8ciIoiXbHl@cluster0.ktnjlcw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connectToDatabase = async()=>{
    await client.connect().then(()=>{
        console.log("connected")
    }).catch((error)=>{
        console.log(new Error(error))
    })
}
module.exports = {client,connectToDatabase}
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


