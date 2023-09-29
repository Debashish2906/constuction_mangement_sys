const User=require('../models/user');
const Task=require('../models/task');
exports.createTask=async(req,res)=>{
     try{
        console.log(req.body,'rq.body');
         const newTask=new Task(req.body);
         const task=await newTask.save();
         const pmanager=await User.findById({_id:req.body.pmanagerId});
         const contractor=await User.findById({_id:req.body.contractorId})
         res.json({
            status:0,
            pmanager,
            contractor,
            task
         });
     }
     catch(err){
        return res.json({
            status:1,
            message:"Something went wrong!"
        })
     }
}
exports.getTaskById=async(req,res)=>{
    const {id}=req.body;
    const _id=id;
    try{
         const task= await Task.findById(_id);
         res.json({
            status:0,
            task
         })
    }
    catch(err){
        return res.json({
            status:1,
            message:"Something went wrong! "
        })
    }
}
exports.getAllTask=async(req,res)=>{
    
    try{
         const task= await Task.find();
         res.json({
            status:0,
            task
         })
    }
    catch(err){
        return res.json({
            status:1,
            message:"Something went wrong! "
        })
    }
}