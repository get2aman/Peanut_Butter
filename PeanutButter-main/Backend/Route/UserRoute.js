const express=require('express')
const UserModel = require('../Model/UserSchema')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const AdminModel = require('../Model/AdminSchema')
const router=express.Router()

router.post("/register",async(req,res)=>{ 
    try {
        const {username,email,password}=req.body
        
        const usernamedata=await UserModel.findOne({username})
        const emaildata=await UserModel.findOne({email})
        if(usernamedata){
            res.json({msg:"Username already exist"})
        }
        if(emaildata){
            res.json({msg:"email already exist"})
        }
    const hashPass=await bcrypt.hash(password,10)
    const response=await UserModel({username,email,password:hashPass});
    await response.save();
    res.status(200).json({msg:"User Registered Successfully"})
    } catch (error) {
        console.log(error)
    }
})
router.post("/login" ,async(req,res)=>{
     try {
        const {username,password}=req.body
     const response=await UserModel.findOne({username})
        if(!response){
            res.json({msg:"Invalid Credentials"})
        }
        const validpass=await bcrypt.compare(password,response.password)
        if(!validpass){
            res.json({msg:"Invalid Credentials"})
        }
        const token=jwt.sign({id:response._id},"secret")
        res.json({token,id:response._id,msg:"Login Success"})
     } catch (error) {
        console.log(error)
     }
})
router.post("/adminlogin" ,async(req,res)=>{
    try {
       const {username,password}=req.body
    const response=await AdminModel.findOne({username})
       if(!response){
           res.json({msg:"Invalid Credentials"})
       }
       const validpass=await bcrypt.compare(password,response.password)
       if(!validpass){
           res.json({msg:"Invalid Credentials"})
       }
       const token=jwt.sign({id:response._id},"secret")
       res.json({token,id:response._id,msg:"Login Success"})
    } catch (error) {
       console.log(error)
    }
})
router.post("/adminregister",async(req,res)=>{ 
    try {
        const {username,email,password}=req.body
        
        const usernamedata=await AdminModel.findOne({username})
        const emaildata=await AdminModel.findOne({email})
        if(usernamedata){
            res.json({msg:"Username already exist"})
        }
        if(emaildata){
            res.json({msg:"email already exist"})
        }
    const hashPass=await bcrypt.hash(password,10)
    const response=await AdminModel({username,email,password:hashPass});
    await response.save();
    res.status(200).json({msg:"User Registered Successfully"})
    } catch (error) {
        console.log(error)
    }
})
module.exports=router;