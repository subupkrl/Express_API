const User = require("../models/authModel")
const Token = require("../models/tokenModel")
const crypto = require("crypto")
const sendEmail = require("../utils/setEmail")
const jwt = require("jsonwebtoken") //authentication

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

            //working for token
            let token = new Token({
                token : crypto.randomBytes(16).toString("hex"),
                userId : user._id
            })
            token = await token.save()
            if (!token){
                return res.status(400).json({error:"Failed to create a token"})
            }
            //send email process
            sendEmail({
                from : "no-reply@online-store.com",
                to : user.email,
                subject : "Email Verification Link",
                text : `Hello,\n\n Please verify your email by using the below link\n\n
                http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
                html : `
                <h1>Verify your Email</h1>
                `
            })
            res.send(user)
        }
        else{
            return res.status(400).json({error:"Email must be unique"})
        }
    })
}

//confirming the email
exports.postEmailConfirmation = (req,res)=>{
    //at first find the valid or matching token
    Token.findOne({token:req.params.token}).then(token=>{
        if(!token){
            return res.status(400).json({error:"Invalid token or token have expired"})
        }
        //if we find the valid token then find the valid user for that token
        User.findOne({_id:token.userId})
        .then(user=>{
            if(!user){
                return res.status(400).json({error:"We are unable to find the valid user for this token"})
            }
            //check if email is already verified or not
            if(user.isVerified){
                return res.status(400).json({error:"Email is already verified"})
            }
            //save the verified user
            user.isVerified = true
            user.save()
            .then(user=>{
                if(!user){
                    return res.status(400).json({error:"Failed to verify email, Try again."})
                }
                res.json({msg:"Congrats! Your Email has been verified,Login to continue"})
            })
            .catch(err=>{
                return res.status(200).json({error:err})
            })
        })
        .catch(err=>{
                return res.status(200).json({error:err})
            })
    })
    .catch(
        err=>{
                return res.status(200).json({error:err})
            })
}

//sign-in process
exports.signIn = async(req,res)=>{
    const {email,password} = req.body
    //at first check if email is registered in database or not
    const user = await User.findOne({email})
    if(!user){
        return res.status(403).json({error:"We are unable to find the email,Register first to login"})
    }
    //if email found then check the password for that email\
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Please provide correct credentials"})
    }
    //check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"Please verify your email to continue"})
    }
    //now generate token with user id and jwt secret
    const token = jwt.sign({_id:user.id},process.env.JWT_SECRET)

    //store token in the cookie
    res.cookie("myCookie",token,{expire:Date.now()+9999999})

    //return user information to frontend
    const {_id,name,role}=user
    return res.json({token,user:{_id,name,email,role}})
}

//forgot password
exports.forgotPassword = async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"Sorry we are unable to find out email in our database, try another or register first"})
    }
    let token = new Token({
        userId:user._id,
        token:crypto.randomBytes(16).toString("hex")
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error:"Failed to create a token"})
    }
     sendEmail({
                from : "no-reply@online-store.com",
                to : user.email,
                subject : "Password Reset Link",
                text : `Hello,\n\n Please reset your password by using the below link\n\n
                http:\/\/${req.headers.host}\/api\/reset\/password\/${token.token}`,
                html : `
                <h1>Password Reset</h1>
                `
            })
            res.json({msg:"Password reset link has been sent to your email"})
}

//reset password
exports.resetPassword = async(req,res)=>{
    //at first find the valid token 
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }
    //if token found then find the valid user for that token
    let user = await User.findOne({_id:token.userId})
    if(!user){
        return res.status(400).json({error:"We are unable to find the valid user for this token"})
    }
    user.password = req.body.password
    user = await user.save()
    if(!user){
        return res.status(400).json({error:"Failed to reset password"})
    }
    res.json({msg:"Password has been reset successfully"})
}