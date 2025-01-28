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

export const Get_Order_Data=async(req,res)=>{
    try {
        const name=req.params.name;
        const data=await OrderModel.find({username:name});
        if(data.length==0)
            return res.status(404).json({message:"No data found!"});
        return res.status(200).json({data:data});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const Update_Arrival_Date = async (req, res) => {
    console.log(req.params); // Check the route parameters
    console.log(req.body);    // Check the body content
  
    try {
      // Get orderId from params (route parameter)
      const { orderId } = req.params;
      const { arrivalDate } = req.body;
  
      // Find the order by ID and update the arrival date
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { arrivalDate: arrivalDate },  // New arrival date
        { new: true }  // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Arrival date updated successfully!", order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the arrival date" });
    }
  };
  