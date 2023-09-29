
const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
     type:String,
     required:[true,"This field is required."]
    },
    password:{
        type:String
    },
    phone:String,
    role:{
        type:String
    },
    profile:{
        type:String
    }

},{timestamps:true})
const User=mongoose.model("User",userSchema);

module.exports=User;