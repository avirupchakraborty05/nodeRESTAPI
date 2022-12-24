const useRoute = require("./routes/user-routes")
const usertable2 = require("./routes/name-routes")

var express = require('express')
const { connectToDatabase } = require("./migrations/connect")

const app = express()


app.use(useRoute)
app.use(usertable2)


app.listen(6000,()=>{
    console.log("The server is running",3000)
    connectToDatabase()
})