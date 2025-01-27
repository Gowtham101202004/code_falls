import express from 'express';
import { Display_Product_Data, Insert_Product_Data } from '../controller/productController.js';

const router =express.Router();

router.post("/insert-product-data",Insert_Product_Data);
router.get("/display-product-data",Display_Product_Data);

export default router;