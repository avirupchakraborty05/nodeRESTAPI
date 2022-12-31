const client =require("../migrations/connect")

const creatmovie = async(req,res,next)=>{
    const {name,director} = req.body || {};
    console.log("The request is",name)
    if(!name && name.trim()!="" && !director && director.trim()!=""){
        res.status(401).send({message:"Not available"})
    }else if(!name && name.trim()!=null){
        res.status(401).send({message:"Name not available"})
    }else if(!director && director.trim()!=null ){
        res.status(401).send({message:"director not available"})
    }
    client.connectToDatabase()
    client.client.db("Store").collection("Movies").insertOne({name,director})
    return res.send({"message":"added successfully"})
}


module.exports={creatmovie}