const express = require("express");
require('dotenv').config()
require('./db/connection')

const bodyParser = require('body-parser')

const testRoute = require("./routes/testRoute")
const categoryRoute = require("./routes/categoryRoute")
const productRoute = require("./routes/productRoute")


const app = express()

// app.get("/test",(req,res)=>{
//     res.send("This is API Server")
// })

//middleware
app.use(bodyParser.json())


//routes
app.use("/api",testRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);

port = process.env.PORT || 5000

//listen to the port
app.listen(port,()=>{
    console.log(`Server has started on ${port}`)
})