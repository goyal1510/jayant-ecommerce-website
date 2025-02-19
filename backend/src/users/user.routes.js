const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const { TokenExpiredError } = require('jsonwebtoken');
const router = express.Router();

// Register Endpoint

router.post('/register',async (req,res)=>{
    try {
        const {username,email,password}= req.body;
        const user = new User({
            username,email,password
        });
        await user.save();
        res.status(201).send({message:"User registered Successfully"})
    } catch (error) {
        console.log("Error Registering The User : ",error);
        res.status(500).send({message:"Error Registering The User"})
    }
    
})

// Login Endpoint

router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user =await User.findOne({email:email});
        if(!user){
            return res.status(404).send({message:"User Not Found"});
        }     
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message:"Wrong Password"});
        }

        const token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        })
        res.status(200).send({message:"User Logged In Successfully",user:{
            _id:user._id,
            username:user.username,
            bio:user.bio,
            profession:user.profession,
            profileImage:user.profileImage,
            role:user.role
        }});

    } catch (error) {
        console.log("Error Logging In The User : ",error);
        res.status(500).send({message:"Error Logging In The User"})
    }
})

module.exports = router;