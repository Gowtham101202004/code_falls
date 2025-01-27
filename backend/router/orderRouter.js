import express from 'express';
import { Display_Order_Data, Insert_Order_Data } from '../controller/orderController.js';

const router=express.Router();

router.post("/insert-order-data",Insert_Order_Data);
router.get("/display-order-data",Display_Order_Data);

export default router;