import mongoose from "mongoose";

const User=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phno:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        address:{
            type:String,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("user-data",User);