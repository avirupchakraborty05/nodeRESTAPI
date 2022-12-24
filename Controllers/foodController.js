const client =require("../migrations/connect")
const getfood = async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Food").find().toArray();
    return res.send({data:stages})
}

module.exports={getfood}