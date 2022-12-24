const Router = require("express")
const app = Router()

const name =[
    {"name" : "PER1"},
    {"name" : "PER2"},
    {"name" : "PER3"}
]

app.get("/api/name1",(req,res,next)=>{
    res.send({"data":name})
})


module.exports = app;