const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const Order = new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        required:true,
        ref:"OrderItem"
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending",
        required:true
    },
    totalPrice:{
        type:Number,
    },
    user:{
        type:ObjectId,
        required:true,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Order",Order)