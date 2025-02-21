const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    role:{
        type:String,default:'user'
    },
    profileImage:String,
    bio:{
        type:String,maxlength:200
    },
    profession:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})


// hashing password

UserSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password,10);
    user.password = hashedPassword;
    next();
})

UserSchema.methods.comparePassword = function(userPassword){
    return bcrypt.compare(userPassword,this.password);
} 
const User = new mongoose.model("User",UserSchema);

module.exports = User;