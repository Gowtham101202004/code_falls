import express from 'express';
import { Display_Order_Data, Insert_Order_Data,Get_Order_Data, Update_Arrival_Date } from '../controller/orderController.js';

const router=express.Router();

router.post("/insert-order-data",Insert_Order_Data);
router.get("/display-order-data",Display_Order_Data);
router.get("/get-order-data/:name",Get_Order_Data);
router.put("/update-arrival-date/:orderId",Update_Arrival_Date);

export default router;