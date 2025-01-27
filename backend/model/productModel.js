import mongoose from 'mongoose';

const productData=new mongoose.Schema(
    {
        src:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        category:{
            type:String,
            required:true,
        }
    }
);

export default mongoose.model("product-datas",productData);