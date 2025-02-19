const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const  PORT = process.env.PORT || 3000;

// middleware setup

app.use(express.json({limit:"25mb"}));
app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})


// All routes

const authRoutes = require("./src/users/user.routes.js")
app.use('/api/auth',authRoutes);

main().then(()=>{console.log("MongoDB is connected Succesfully.");}).catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.DB_URL);
}

app.listen(PORT,()=>{
    console.log(`The app is running on port: ${PORT}`);
})


