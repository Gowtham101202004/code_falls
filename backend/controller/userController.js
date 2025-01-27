import UserModel from "../model/userModel.js";
import handler from 'express-async-handler';

export const Insert_User_Data=handler(async(req,res)=>{
    console.log("Request Register -> ",req.body.name);
    try{
        const newUserModel=new UserModel(req.body);
        if(!req.body)
            return res.status(401).json({message:"Empty data!"});
        await newUserModel.save();
        return res.status(200).json({message:"User data saved!",data:newUserModel});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
});

export const Login_User_Data=expressAsyncHandler(async(req,res)=>{
    console.log("Login request -> ",req.body);
    try{
    if(!req.body)
        return res.status(400).json({message:"Empty user data!"});
    const data=await UserModel.findOne({email:req.body.email});
    if(!data)
        return res.status(400).json({message:"User not found!"});

    else{
        if(data.email==req.body.email){
            if(data.password==req.body.password){
                return res.status(200).json({message:"Login successfull!",data:data});
            }
            return res.status(400).json({message:"Invalid password!"});
        }
        return res.status(400).json({message:"Unable to find user!"});
    }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
});

//OTP sender

import { OTP } from "../middleware/otpGeneratorMiddleware.js";
import { sendSMS } from "../middleware/smsMiddleware.js";
import expressAsyncHandler from "express-async-handler";
const storage={};

export const Send_OTP_Message=handler(async(req,res)=>{
    console.log("Request OTP Message -> ",req.body);
    try{
        if(!req.body)
            return res.status(401).json({message:"Phone number not found!"});

       const {otp,expires}=OTP();
       storage[req.body.phno]={otp:otp,expires:expires};
         sendSMS({otp:otp,phno:req.body.phno});
       return res.status(201).json({message:"Verify otp send!"});

    }catch(err){
        return res.status(501).json({message:err.message});
    }
});

export const Verify_OTP=handler(async(req,res)=>{
    console.log("Request Verify OTP -> ",req.body);
    try{
        if(!req.body)
            return res.status(401).json({message:"Empty data!"});
        const {phno,otp}=req.body;
        const storedData=storage[phno];

        if(!storedData)
            return res.status(401).json({message:"Invalid OTP for this Phone number!"});

        if(Date.now()> storedData.expires)
            return res.status(401).json({message:"OTP expired!"});
        if(otp!=storedData.otp)
            return res.status(400).json({message:"Invalid OTP!"});

        return res.status(201).json({message:"Valid OTP"});

    }catch(err){
        return res.status(501).json({message:err.message});
    }
});

export const List_Users_Data=handler(async(req,res)=>{
    try {
        const data=await UserModel.find({});
        if(data.length==0)
            return res.status(404).json({message:"No data found!"});
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(501).json({message:error.message});
        
    }
})