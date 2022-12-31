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

const updatemovie = async(req,res,next)=>{
    const id = req.params.id;
    const {name,director} = req.body;
    console.log("The id os",id)
    if(!name && !director){
        res.status(401).send({message:"not available"})
    }
    let payload = {
        if (name){
            payload
        }
    }
}

const getmovies = async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Movies").find().toArray();
    return res.send({data:stages})
}


module.exports={creatmovie,updatemovie,getmovies}