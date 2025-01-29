import mongoose from 'mongoose';

const order=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    arrivalDate:{
        type:String,
        default:'Processing...',
    },
    products:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
});

export default mongoose.model("order-data",order);