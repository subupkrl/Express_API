const express = require("express");
require('dotenv').config()

const testRoute = require("./routes/testRoute")


const app = express()

app.get("/test",(req,res)=>{
    res.send("This is API Server")
})


//routes
app.use("/api",testRoute)

port = process.env.PORT || 5000

//listen to the port
app.listen(port,()=>{
    console.log(`Server has started on ${port}`)
})