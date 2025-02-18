const express = require("express");
const app = express();
const  PORT = 3000;

app.listen(PORT,()=>{
    console.log(`The app is running on port: ${PORT}`);
})

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})
app.get("/hello",(req,res)=>{
    res.send("Hello World");
})