const client =require("../migrations/connect")
const getfood = async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Food").find().toArray();
    return res.send({data:stages})
}

const creatfood = async(req,res,next)=>{
    const {name,rs} = req.body || {};
    console.log("The request is", name)
    if(!name && name.trim()!="" && !rs && rs.trim()!= ""){
        res.status(401).send({message:"Not avilable"})
    }else if(!name && name.trim()!=null){
        res.status(401).send({message:"Name not available"})
    }else if(!rs && rs.trim()!=null ){
        res.status(401).send({message:"Rs not available"})
    }
    client.connectToDatabase()
    client.client.db("Store").collection("Food").insertOne({name,rs})
    return res.send({"message":"added successfully"})
}

const updatefood =async(req,res)=>{
    const id = req.params.id;
    const {name,rs} = req.body;
    console.log(id)
    if(!name && !rs){
        res.status(401).send({message:"not available"})
    }
    let payload = {}
    if(name){
        payload
    }
}


module.exports={updatefood}

module.exports={creatfood}

module.exports={getfood}