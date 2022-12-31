const Router = require("express")
const bodyParser = require("body-parser");
const { Double, ObjectId } = require("mongodb")
const app = Router()
app.use(bodyParser.json());
const client = require("../migrations/connect")
// const UserControll = require("../Controllers/userController")
const {getusers} = require("../Controllers/userController")
const {getfood} = require("../Controllers/foodController")
const {creatfood} = require("../Controllers/foodController")
const {updatefood} = require("../Controllers/foodController")
const {creatuser} = require("../Controllers/userController")
const {updateuser} = require("../Controllers/userController")
const {creatmovie} = require("../Controllers/movieController")
const {updatemovie} = require("../Controllers/movieController")
const {getmovies} = require("../Controllers/movieController")
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
})



app.get("/api/items",async(req,res,next)=>{
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Items").find().toArray();
    return res.send({data:stages})
})



app.get("/api/name",async(req,res,next)=>{
    res.send({"data":name_table})
})



app.post("/api/user/create",creatuser)


app.post("/api/food/create",creatfood)


app.post("/api/user/update/:id",updateuser)

app.post("/api/food/update/:id",updatefood)


app.delete("/api/user/delete/:id",async(req,res)=>{
    const id = req.params.id;
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Users").deleteOne({_id:ObjectId(`${id}`)});
    return res.send({message:"deleted successfully"})
})

app.delete("/api/food/delete/:id",async(req,res)=>{
    const id = req.params.id;
    client.connectToDatabase()
    const stages = await  client.client.db("Store").collection("Food").deleteOne({_id:ObjectId(`${id}`)});
    return res.send({message:"deleted"})
})


app.post("/api/movie/create",creatmovie)
app.post("/api/movie/update/:id",updatemovie)
app.post("/api/movie",getmovies)
module.exports = app;