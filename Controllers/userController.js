const { ObjectId } = require("mongodb");
const client = require("../migrations/connect")
const getusers = async (req, res, next) => {
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Users").find().toArray();
    return res.send({ data: stages })
}

const getUserByid = async (req, res, next) => {
    const id = req.id
    const token = req.token
    client.connectToDatabase()
    console.log("The id is", id)
    const stages = await client.client.db("Store").collection("User").findOne({ _id: id });
    console.log(stages)
    res.status(200).send({ "msg": "added successfully", data: stages, token: token,success:true })
}
const creatuser = async (req, res, next) => {
    const { name, password } = req.data || {};
    console.log(req.data)
    client.connectToDatabase()
    const userfind = await client.client.db("Store").collection("User").findOne({ name })
    let user = {};
    if (!userfind) {
        user = await client.client.db("Store").collection("User").insertOne({ name, password })

    } else {
        res.status(200).send({ "msg": "recordd already exists..." })
    }
    console.log(user)
    req.id = user.insertedId
    next()
}
const loginuser = async (req, res, next) => {
    const { name, password } = req.data || {};
    console.log(req.data)
    client.connectToDatabase()
    const userfind = await client.client.db("Store").collection("User").findOne({ name })
    let user = {};
    if (!userfind) {
        
     user = await client.client.db("Store").collection("User").findOne({ name, password })


    } else {
        res.status(200).send({ "msg": "record doesnt exists,please signup...",success:false })
    }
    console.log(user)
    req.id = user.insertedId
    next()
}
const elf = async (req, res, next) => {
    const { jk } = req.body || {};
    if (jk) {
        next()
    } else {
        res.status(200).send({
            "msg": "not found"
        })
    }


}


const updateuser = async (req, res) => {
    const id = req.params.id;
    const { name, gender } = req.body;
    console.log(id)
    if (!name && !gender) {
        res.status(401).send({ message: "not available" })
    }
    let payload = {}
    if (name) {
        payload = { ...payload, ["Name"]: name }
    }
    if (gender) {
        payload = { ...payload, ["Gender"]: gender }
    }
    let payloads = { $set: payload }
    client.connectToDatabase()
    const stages = await client.client.db("Store").collection("Users").findOne({ _id: ObjectId(`${id}`) });
    client.client.db("Store").collection("Users").updateOne({ _id: ObjectId(`${id}`) }, payloads)
    return res.send({ "message": "updated successfully" })
}


module.exports = { updateuser, loginuser, creatuser, getusers, elf, getUserByid }

// module.exports={creatuser}

// module.exports={getusers}