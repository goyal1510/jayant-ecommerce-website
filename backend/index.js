const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const  PORT = process.env.PORT || 3000;

// middleware setup

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"https://jayant-ecommerce-website.vercel.app/",
    credentials: true
}));

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})


// All routes

const authRoutes = require("./src/users/user.routes.js")
const productRoutes = require("./src/products/products.routes.js")
app.use('/api/auth',authRoutes);
app.use('/api/product',productRoutes);

async function main(){
    await mongoose.connect(process.env.DB_URL);
}
main().then(()=>{console.log("MongoDB is connected Succesfully.");}).catch(err => console.log(err));
app.listen(PORT,()=>{
    console.log(`The app is running on port: ${PORT}`);
})

app.get("/hello",(req,res)=>{
    res.send("Hello World!!")
})


