const User = require("../models/authModel")

//to register a new user
exports.postUser = async(req,res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    User.findOne({email:user.email}).then (async data=>{
        if(data == null){
            user = await user.save()
            if(!user){
                return res.status(400).json({error:"Something went wrong"})
            }
            res.send(user)
        }
        else{
            return res.status(400).json({error:"Email must be unique"})
        }
    })
}