const client = require("../migrations/connect")
const getusers = async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").find().toArray();
    return res.send({data:stages})
}

module.exports={getusers}