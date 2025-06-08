const express = require("express");
require('dotenv').config()
require('./db/connection')

const bodyParser = require('body-parser')
const morgan = require("morgan")
const cors = require("cors")

const testRoute = require("./routes/testRoute")
const categoryRoute = require("./routes/categoryRoute")
const productRoute = require("./routes/productRoute")
const authRoute = require("./routes/authRoute")
const orderRoute = require("./routes/orderRoute")


const app = express()

// app.get("/test",(req,res)=>{
//     res.send("This is API Server")
// })

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use("/public/uploads",express.static("public/uploads"))
app.use(cors())


//routes
app.use("/api",testRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",authRoute);
app.use("/api",orderRoute)

port = process.env.PORT || 5000

//listen to the port
app.listen(port,()=>{
    console.log(`Server has started on ${port}`)
})