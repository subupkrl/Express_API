const mongoose = require("mongoose")
const uuidv1 = require("uuidv1")
const crypto = require("crypto")
const { type } = require("os")

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:Number,
        default:0
    },
    hashed_Password:{
        type:String,
        required:true
    },
    salt:String,
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


//virtual fields
authSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_Password = this.encryptPassword(password)
})
.get(function(){
    return this.hashed_Password
})

//defining methods
authSchema.methods={
    encryptPassword :function(password){
        if(!password) return ""
        try {
            return crypto
            .createHmac("sha1",this.salt)
            .update(password)
            .digest("hex")
        } catch (error) {
            return error
        }
    }
}

module.exports = mongoose.model("User",authSchema)