const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Task=require('../models/task')
exports.createUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
   return  res.json({
      status: 1,
      message: "All fields are required.",
    });
  }

  try {
    const existUser = await User.findOne({ email }); 
    if (existUser) {
     return res.json({
        status: 1,
        message: "User already exist.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    const createdUser = await newUser.save();
     if(!createdUser){
      return res.json({
        status:1,
        message:"Some went wrong!"
      })
     }
    res.json({
      status: 0,
      data: createdUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: 1,
      message: "All fields are required.",
    });
  }
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
       return res.json({
        status: 1,
        message: "User not found.",
      });
    }
    const matchedPassword = await bcrypt.compare(password, existUser.password);
    if (!matchedPassword) {
       return res.json({
        status: 1,
        message: "Incorrect Password",
      });
    }
    const jwtPayload = {
      email,
    };
    const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      status: 0,
      token,
      user:existUser
    });
  } catch (err) {
     return res.json({
      status: 1,
      message: "something went wrong!!",
    });
  }
};

exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    console.log(id,"igdiugh");
    const _id=id;
    try{
       const existUser=await User.findById(_id);
       console.log(existUser," exituser");
       if(!existUser){
        return res.json({
            status:1,
            message:"user not exist"
        })
       }
       console.log(req.body," req.body")
       const updatedUser=await User.findByIdAndUpdate(_id,req.body,{new:true});
       console.log(updatedUser," updated user");
       res.json({
        status:0,
        data:updatedUser
       })
    }
    catch(err){
       return res.json({
            status:1,
            message:"some thing went wrong!!"
        })
    }
}
exports.deleteUser=async(req,res)=>{
   const {id}=req.params;
   try{
       
       const existUser= await User.findById({_id:id});
       if(!existUser){
        return res.json({
          status:1,
          message:"User not exist"
        })
       }
        const deletedUser=await User.findByIdAndDelete({_id:id});
       res.json({
        status:0,
        deletedUser
       })
   }
   catch(err){
    res.json({
        status:1,
        message:err.message
    })
   }
}
exports.allUser=async(req,res)=>{
    try{
      const users=await User.find();
      res.json({
        status:0,
        length:users.length,
        users
      })
    }
    catch(err){
        res.json({
            status:1,
            message:err.message
        })
    }
}
exports.addTask=async(req,res)=>{
      try{
        const task=new Task(req.body);
        const newTask=await task.save();
        console.log(newTask)
        res.json({
          status:0,
          data:newTask
        })
      }
      catch(err){
        console.log(err);
      }
}
exports.getTask=async(req,res)=>{
  try{
    const task=await Task.find();
    res.json({
      status:0,
      data:task
    })
  }
  catch(err){
    console.log(err);
  }
}
exports.deleteTask=async(req,res)=>{
  const {id}=req.params;
    console.log(id)
    try{
         await Task.findByIdAndDelete(id);
         res.json("deleted successfully")
    }catch(err){
      res.json(err)
    }
}
exports.getTaskById=async(req,res)=>{
  try{
      const {id}=req.params;
      const task=await Task.findById(id);
      res.json({
        status:0,
        data:task
      })
  }catch(err){
    res.json(err)
  }
}
exports.updateTask=async(req,res)=>{
  const {id}=req.params;
  try{
     const updatedTask=await Task.findByIdAndUpdate(id,req.body,{new:true});
     res.json({
      status:0,
      message:'Updated successfully'
     })
  }catch(err){
    res.json(err);
  }
}