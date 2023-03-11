const validator = require("validatorjs");

const Validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};



const validatorforRegister = (req,res,next)=>{
    // console.log("The req,uest is",name)
    const {name,password} = req.body || {};
    if(!name && name.trim()!="" && !password && password.trim()!="" ){
        res.status(401).send({message:"not available"})
    }else if(!name && name.trim()!=null){
        res.status(401).send({message:"Name not available"})
    }else if(!password && password.trim()!=null ){
        res.status(401).send({message:"Gender not available"})
    }

    req.data = {name,password}
    next()
    
}


module.exports = {validatorforRegister}