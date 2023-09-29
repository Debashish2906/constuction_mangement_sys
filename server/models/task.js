const mongoose=require('mongoose');

const task=new mongoose.Schema({
    name:String,
    price:String,
    images:String,
    place:String,
    desc:String,
    startD:Date,
    endD:Date
   
 
},{timestamps:true})
const Task=mongoose.model("Task",task);
module.exports=Task;