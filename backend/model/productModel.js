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
        previousPrice:{
            type:Number,
            default:0,
        },
        category:{
            type:String,
            required:true,
        },
        stock:{
            type:Number,
            default:0,
        }
    }
);

export default mongoose.model("product-datas",productData);