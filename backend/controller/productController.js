import ProductModel from '../model/productModel.js';
import handler from 'express-async-handler';

export const Insert_Product_Data=handler(async(req,res)=>{
    console.log("Insert Product Request -> ",req.body);
    try{
        const newProduct=new ProductModel(req.body);
        if(!newProduct)
            return res.status(401).json({message:"Empty product data!"});
        await newProduct.save();
        return res.status(201).json({message:"Product data inserted successfully!"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
});


export const Display_Product_Data=handler(async(req,res)=>{
    console.log("Product Data request -> ",req.url);
    try{
        const data=await ProductModel.find({});
        if(data.length==0)
            return res.status(401).json({message:"Empty product data!"});
        return res.status(201).json({message:"Product data fetched!",data:data});

    }catch(err){
        return res.status(500).json({message:err.message});
    }
})