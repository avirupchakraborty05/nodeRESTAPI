const client = require("../migrations/connect")
const getusers = async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").find().toArray();
    return res.send({data:stages})
}
const creatuser =async(req,res,next)=>{
    const {name,gender} = req.body || {};
   console.log("The request is",name)
   if(!name && name.trim()!="" && !gender && gender.trim()!="" ){
       res.status(401).send({message:"not available"})
   }else if(!name && name.trim()!=null){
       res.status(401).send({message:"Name not available"})
   }else if(!gender && gender.trim()!=null ){
       res.status(401).send({message:"Gender not available"})
   }
   client.connectToDatabase()
   client.client.db("Store").collection("User").insertOne({name,gender})
   return res.send({"message":"added successfully"})
}

const updateuser=async(req,res)=>{
    const id = req.params.id;
    const {name,gender} = req.body;
    console.log(id)
    if(!name  && !gender ){
        res.status(401).send({message:"not available"})
    }
    let payload ={}
    if(name){
      payload = {...payload,["Name"]:name}
    }
    if(gender){
        payload = {...payload,["Gender"]:gender}
    }
    let payloads = {$set:payload}
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").findOne({_id:ObjectId(`${id}`)});
    client.client.db("Store").collection("Users").updateOne({_id:ObjectId(`${id}`)},payloads)
    return res.send({"message":"updated successfully"})
}


module.exports={updateuser,creatuser,getusers}

// module.exports={creatuser}

// module.exports={getusers}