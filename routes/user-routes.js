const Router = require("express")
const bodyParser = require("body-parser");
const { Double, ObjectId } = require("mongodb")
const app = Router()
app.use(bodyParser.json());
const client = require("../migrations/connect")
// const UserControll = require("../Controllers/userController")
const {getusers} = require("../Controllers/userController")
const {getfood} = require("../Controllers/foodController")
const usertable = [
    {"name":"avirup",email:"avirup@gmail.com", password:"Asirup@1999"},
    {"name":"Shankhadeep",email:"Shankha@gmai.com",password:"ERD@1999" }
]
const name_table =[
    {"name": "Avirup"},
    {"name": "Sankha Sir"},
    {"Name": "Per_3"}
]
const dbName = "Store"
app.get("/api/user",getusers)
app.get("/api/food",getfood)

app.get("/api/user/:id",async(req,res,next)=>{
    const id = req.params.id
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").findOne({_id:ObjectId(`${id}`)});
    return res.send({data:stages})
    // try{    
    // const users = await client.client.db(dbName).collection("Users").find();
    //     users.forEach((err,doc)=>{
    //         console.log(doc)
    //     })
    // }catch(err){
    //     console.log(err)
    // }
    
   
})
app.get("/api/items",async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Items").find().toArray();
    return res.send({data:stages})
})



app.get("/api/name",async(req,res,next)=>{
    res.send({"data":name_table})
})

app.post("/api/user/create",async(req,res,next)=>{
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
})


app.post("/api/food/create",async(req,res,next)=>{
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
})


app.post("/api/user/update/:id",async(req,res)=>{
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
})

app.post("/api/food/update/:id",async(req,res)=>{
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
})


app.delete("/api/user/delete/:id",async(req,res)=>{
    const id = req.params.id;
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").deleteOne({_id:ObjectId(`${id}`)});
    return res.send({message:"deleted successfully"})
})
module.exports = app;