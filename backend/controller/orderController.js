import OrderModel from '../model/orderModel.js'

export const Insert_Order_Data=async(req,res)=>{
    try {
        const newOrder=new OrderModel(req.body);
        await newOrder.save();
        
        return res.status(200).json({message:"Order data saved!"});
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
}

export const Display_Order_Data=async(req,res)=>{
    try {
        
        const data=await OrderModel.find({});
        return res.status(200).json({data:data});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}