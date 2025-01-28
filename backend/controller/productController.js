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
});

export const Update_Product = handler(async (req, res) => {
    console.log("Update request -> ",req.params.id)
    try {
        const id = req.params.id;
        const { price, ...otherData } = req.body;

        // Find the product to check the current price
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // If the price has changed, update the previous price
        if (price && product.price !== price) {
            req.body.previousPrice = product.price; // Set previous price to current price
            req.body.price = price; // Set new price
        }

        // Update the product with new data (including previousPrice and price if changed)
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to update the product!" });
    }
});

export const Delete_Product=handler(async(req,res)=>{
    console.log("Delete request -> ",req.params.id);
    try {
        const id=req.params.id;
        const product=await ProductModel.findByIdAndDelete(id);
        if(!product)
            return res.status(404).json({message:"Product not found!"});
        return res.status(200).json({message:"Product deleted!"});
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
})
